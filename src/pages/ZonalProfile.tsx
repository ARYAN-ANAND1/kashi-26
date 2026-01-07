import { useContext, useEffect, useState } from "react";
import AuthContext from "@/Context/AuthContext";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/";

const ZonalProfile = () => {
  const { userInfo, authTokens } = useContext(AuthContext);
  const [zonalInfo, setZonalInfo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchZonalProfile = async () => {
      try {
        const token = authTokens?.access || JSON.parse(localStorage.getItem("authTokens") || "null")?.access;
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`${VITE_BACKEND_URL}/api/user/profile/zonal`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200 && res.data) {
          setZonalInfo(res.data);
        }
      } catch (e) {
        // If zonal profile endpoint not available or fails, fall back to userInfo
        console.warn("Failed to fetch zonal profile, falling back to AuthContext.userInfo", e);
      } finally {
        setLoading(false);
      }
    };

    fetchZonalProfile();
  }, [authTokens]);

  const info = zonalInfo || userInfo;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-start pt-24 pb-12 bg-gradient-to-b from-[#100318] to-[#310D3D] text-white">
        <div className="w-full max-w-3xl bg-[#310D3D] rounded-xl p-8 border-[6px] border-[#DBAF7B]">
          <h1 className="text-3xl font-bold mb-4">Zonal Profile</h1>

          {loading ? (
            <p className="text-gray-300">Loading...</p>
          ) : info ? (
            <div className="space-y-3 text-white">
              <p><strong>Name:</strong> {info.name}</p>
              <p><strong>Email:</strong> {info.gmail || info.email}</p>
              <p><strong>KY ID:</strong> {info.ky_id || info.id || "-"}</p>
              <p><strong>Phone:</strong> {info.mobile_number || "-"}</p>
              <p><strong>College:</strong> {info.college || "-"}</p>
              {/* Zonal-specific fields - show any available extras */}
              <p><strong>Payment:</strong> {info.purchased_benefits && info.purchased_benefits.length ? "Paid" : "Not Paid"}</p>
            </div>
          ) : (
            <p className="text-gray-300">No zonal user is currently logged in.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ZonalProfile;
