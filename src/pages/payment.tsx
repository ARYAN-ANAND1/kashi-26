import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // e.g., https://api.example.com/api
const X_SECRET = import.meta.env.VITE_X_SECRET;        // must match backend secret

const eventHeadingStyle: CSSProperties = {
  fontFamily: "Urbanist, sans-serif",
  fontWeight: 700,
  background: "linear-gradient(93.83deg, #FFD966 0%, #C285E0 40%, #7D8FE8 100%)",
  backgroundSize: "200% 200%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  display: "inline-block",
  width: "fit-content",
};

const PaymentComponent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [kyid, setKyid] = useState<string>("");

  // Fetch KYID from profile (requires auth token)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !BACKEND_URL) return;

    (async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // backend returns `ky_id` in the profile
        if (res?.data?.user?.ky_id) {
          setKyid(res.data.user.ky_id);
        }
      } catch (e) {
        // Non-blocking: user can still attempt, but confirm will fail without kyid
        console.warn("Unable to fetch profile for kyid:", e);
      }
    })();
  }, []);

  // Parse URL params safely
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const txId = query.get("payment_id") || query.get("txId") || query.get("order_id") || "";
  const status = (query.get("status") || "").toLowerCase(); // e.g., "success"
  const ticketType = query.get("ticketType") || ""; // you pass this in returnUrl

  // Verify payment on return
  useEffect(() => {
    if (!BACKEND_URL) {
      console.error("VITE_BACKEND_URL is not set");
      return;
    }
    if (!X_SECRET) {
      console.error("VITE_X_SECRET is not set");
      return;
    }

    // Require minimal params to attempt confirmation
    if (!txId || !ticketType || !kyid) {
      if (!kyid) {
        toast.warn("Please log in to verify your payment.");
      }
      return;
    }

    // Only attempt on explicit success statuses if present.
    // If your gateway doesn't set `status`, you can remove this check.
    if (status && status !== "success") {
      toast.error("Payment was not successful.");
      setTimeout(() => navigate("/failed"), 1200);
      return;
    }

    (async () => {
      try {
        toast.info("Verifying your payment...");
        const res = await axios.post(
          `${BACKEND_URL}/payments/confirm`,
          {
            category: "konfhub",       // or "consult" if you prefer; backend ignores this currently
            ticketType: ticketType,
            txId: txId,
            kyid: kyid,
          },
          {
            headers: {
              "x-secret": X_SECRET,
              "Content-Type": "application/json",
              "x-kyid": kyid,
            },
          }
        );

        if (res?.data?.ok) {
          toast.success(`✅ Payment verified for ${ticketType}!`);
          setTimeout(() => navigate("/success"), 1500);
        } else {
          toast.error("❌ Payment verification failed. Please contact support.");
          setTimeout(() => navigate("/failed"), 1500);
        }
      } catch (err) {
        console.error(err);
        toast.error("⚠ Error verifying payment. Please try again later.");
      }
    })();
  }, [BACKEND_URL, X_SECRET, kyid, navigate, status, ticketType, txId]);

  // Build a KonfHub (or Consult) URL with returnUrl back to this page
  const generateKonfhubUrl = (eventId: string, ticket: string) => {
    const returnUrl = `${window.location.origin}/payment?ticketType=${encodeURIComponent(ticket)}`;
    return `https://konfhub.com/${eventId}?returnUrl=${encodeURIComponent(returnUrl)}`;
  };

  return (
    <>
      <Navbar />
      <div
        className="w-full min-h-screen px-4 py-16 flex flex-col items-center"
        style={{
          background:
            "linear-gradient(180deg, #100318 0%, #310D3D 15%, #6A3E92 35%, #310D3D 70%, #100318 100%)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl" style={eventHeadingStyle}>Payment</h1>
          <h2 className="text-[#D2C1A1] font-raleway text-lg pt-2">
            Customize and buy tickets per your preferences.
          </h2>
        </div>

        {/* Disclaimer Section */}
        <div className="w-full max-w-4xl mb-8 bg-red-900/20 border-2 border-red-500/50 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">!</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-red-400 font-bold text-xl mb-3">Important Disclaimer</h3>
              <div className="text-gray-200 space-y-3 text-sm leading-relaxed">
                <p>
                  <strong className="text-red-300">Eligibility Requirements:</strong> Registration for Kashiyatra is exclusively for current college students and recent graduates (last year passouts only). Only these participants are eligible for the festival.
                </p>
                
                <p>
                  <strong className="text-red-300">ID Verification Required:</strong> At the time of collecting your KY ID card during the festival, you must present one of the following documents:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li> Valid College ID Card, OR</li>
                  <li> Aadhar Card along with proof of college enrollment</li>
                </ul>
                <p className="text-yellow-300 font-semibold">
                  ⚠️ Failure to provide valid documentation may result in denial of entry and forfeiture of registration fees.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets */}
        <div className="flex flex-col gap-8 md:w-[60%]">
          {/* Ticket 1 */}
          <div className="relative bg-[#f3c892] p-6 rounded-2xl shadow-lg border-2 border-[#5A3E2B]">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F3C892] p-2 rounded-full border-4 border-[#5A3E2B] w-10 h-10"></div>
            <h2 className="text-center text-xl font-semibold text-[#3A2D24]">
              Registration With Accommodation and Food
            </h2>
            <p className="text-center text-[#5A3E2B] text-sm line-through">₹3750</p>
            <p className="text-center text-3xl font-bold text-[#3A2D24]">₹2999</p>
            <div className="border-dashed border-t-2 my-4 border-[#5A3E2B]"></div>
            <ul className="text-[#3A2D24] text-sm space-y-2">
              <li>✔ All Events Registration</li>
              <li>✔ All Pronite Access</li>
              <li>✔ Accommodation with Food</li>
              <li>✔ Access to International Carnival</li>
              <li>✔ Official Kashiyatra Welcome Kit</li>
            </ul>
            <a
              href={generateKonfhubUrl("kashiyatra262999", "Registration With Food")}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#553377] text-white py-2 mt-6 rounded-md hover:bg-[#3b0f4e] text-center block"
            >
              Pay Now
            </a>
          </div>

          {/* Ticket 2 */}
          {/* <div className="relative bg-[#f3c892] p-6 rounded-2xl shadow-lg border-2 border-[#5A3E2B]">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F3C892] p-2 rounded-full border-4 border-[#5A3E2B] w-10 h-10"></div>
            <h2 className="text-center text-xl font-semibold text-[#3A2D24]">
              Registration Without Food
            </h2>
            <p className="text-center text-[#5A3E2B] text-sm line-through">₹3400</p>
            <p className="text-center text-3xl font-bold text-[#3A2D24]">₹2699</p>
            <div className="border-dashed border-t-2 my-4 border-[#5A3E2B]"></div>
            <ul className="text-[#3A2D24] text-sm space-y-2">
              <li>✔ All Events Registration</li>
              <li>✔ All Pronite Access</li>
              <li>✔ Accommodation without Food</li>
              <li>✔ Access to International Carnival</li>
              <li>✔ Official Kashiyatra Welcome Kit</li>
            </ul>
            <a
              href={generateKonfhubUrl("kashiyatra262699", "Registration Without Food")}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#553377] text-white py-2 mt-6 rounded-md hover:bg-[#3b0f4e] text-center block"
            >
              Pay Now
            </a>
          </div> */}

          {/* Ticket 3 */}
          <div className="relative bg-[#f3c892] p-6 rounded-2xl shadow-lg border-2 border-[#5A3E2B]">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F3C892] p-2 rounded-full border-4 border-[#5A3E2B] w-10 h-10"></div>
            <h2 className="text-center text-xl font-semibold text-[#3A2D24]">
              Registration Without Accommodation and Food
            </h2>
            <p className="text-center text-[#5A3E2B] text-sm line-through">₹3000</p>
            <p className="text-center text-3xl font-bold text-[#3A2D24]">₹2399</p>
            <div className="border-dashed border-t-2 my-4 border-[#5A3E2B]"></div>
            <ul className="text-[#3A2D24] text-sm space-y-2">
              <li>✔ All Events Registration</li>
              <li>✔ All Pronite Access</li>
              <li>✔ Access to International Carnival</li>
            </ul>
            <a
              href={generateKonfhubUrl("kashiyatra262399", "Registration Without Food and Accommodation")}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#553377] text-white py-2 mt-6 rounded-md hover:bg-[#3b0f4e] text-center block"
            >
              Pay Now
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentComponent;
