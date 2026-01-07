// By-Yashraj'23 
import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { eventsData, contactData } from "../../store/events"; // ✅ added contactData import
import AuthContext from "@/Context/AuthContext";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import TrimmedImage from "@/components/TrimmedImage";
import { CSSProperties } from "react";

// Backend URL for API calls (override with VITE_BACKEND_URL at build time).
// Normalise the configured base so callers don't need to worry about
// trailing slashes or whether the env var already contains `/api`.
// Vite exposes env vars as `import.meta.env.VITE_*` during build.
const RAW_BACKEND = (import.meta as any).env?.VITE_BACKEND_URL || "http://localhost:6969";

// Normalise the configured base so callers don't need to worry about
// trailing slashes or whether the env var already contains `/api`.
const BACKEND_URL = (() => {
  let b = (RAW_BACKEND || "").trim();
  if (b.endsWith("/")) b = b.slice(0, -1);
  if (b.toLowerCase().endsWith("/api")) b = b.slice(0, -4);
  return b;
})();

// Build a full API URL from a path like `/event_reg/register` or `event_reg/register`.
const buildApiUrl = (p: string) => {
  const path = p.startsWith("/") ? p : `/${p}`;
  const apiPath = path.startsWith("/api/") ? path : `/api${path}`;
  return `${BACKEND_URL}${apiPath}`;
};
// Hardcoded shared secret to match backend
const SHARED_SECRET = "ky_secret_c2b9c6f7287d4a2fb8e5a1d3e4f6a7b9";

// Exported testable helpers
export type PaymentResult = {
  status?: string;
  ticketType?: string;
  txId?: string;
};

export const parsePaymentResult = (search: string): PaymentResult => {
  const p = new URLSearchParams(search);
  const status = p.get("status") || undefined;
  const ticketType = p.get("ticketType") || undefined;
  const txId = p.get("txId") || undefined;
  return { status, ticketType, txId };
};

export async function confirmPaymentRequest(params: {
  category: string;
  ticketType: string;
  txId?: string;
  secret?: string;
}) {
  const url = buildApiUrl("/payments/confirm");
  console.log("confirmPaymentRequest ->", url, params);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-secret": params.secret || SHARED_SECRET,
    },
    body: JSON.stringify({
      category: params.category,
      ticketType: params.ticketType,
      txId: params.txId,
    }),
  });
  if (!res.ok) {
    let body = "";
    try {
      body = await res.text();
    } catch (e) {
      /* ignore */
    }
    console.error("confirmPaymentRequest failed", { url, status: res.status, body });
    throw new Error(`Payment confirmation failed (${res.status}): ${body || "no response body"}`);
  }
  return res.json().catch(() => ({}));
}

export async function registerOnBackend(params: {
  eventId: number;
  kyid: string;
  teamName?: string;
}) {
  // For individual events we use /api/event_reg/register which registers a
  // single KYID without creating a Team. If a teamName is provided we fall
  // back to the team-create endpoint.
  if (!params.teamName) {
    const url = buildApiUrl(`/event_reg/register`);
    // Attempt primary backend first
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kyid: params.kyid, event_id: params.eventId }),
      });

      if (res.ok) return res.json().catch(() => ({}));

      // read response body (if any) to include in error message
      let body = "";
      try { body = await res.text(); } catch (e) { /* ignore */ }

      // If primary is 404 and primary origin differs from frontend origin,
      // try a single fallback to the frontend origin `/api/...` (useful in dev)
      const primaryOrigin = new URL(url).origin;
      const frontendOrigin = window.location.origin;
      if (res.status === 404 && primaryOrigin !== frontendOrigin) {
        const fallbackUrl = `${frontendOrigin}/api/event_reg/register`;
        try {
          const fres = await fetch(fallbackUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ kyid: params.kyid, event_id: params.eventId }),
          });
          if (fres.ok) return fres.json().catch(() => ({}));
          let fbody = "";
          try { fbody = await fres.text(); } catch (e) { /* ignore */ }
          throw new Error(`Registration failed (primary ${res.status}: ${body || 'no body'}, fallback ${fres.status}: ${fbody || 'no body'})`);
        } catch (fe) {
          throw new Error(`Registration failed (primary ${res.status}: ${body || 'no body'}). Fallback error: ${fe}`);
        }
      }

      // For non-404 or same-origin cases, return a helpful error
      throw new Error(`Registration failed (${res.status}): ${body || 'no response body'}`);
    } catch (netErr) {
      // Network-level failure when calling primary. Try fallback once if origins differ.
      const frontendOrigin = window.location.origin;
      const primaryOrigin = new URL(url).origin;
      if (primaryOrigin !== frontendOrigin) {
        const fallbackUrl = `${frontendOrigin}/api/event_reg/register`;
        try {
          const fres = await fetch(fallbackUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ kyid: params.kyid, event_id: params.eventId }),
          });
          if (fres.ok) return fres.json().catch(() => ({}));
          let fbody = "";
          try { fbody = await fres.text(); } catch (e) { /* ignore */ }
          throw new Error(`Registration failed after network error. Fallback returned ${fres.status}: ${fbody || 'no body'}`);
        } catch (fe) {
          throw new Error(`Registration failed: ${netErr}`);
        }
      }
      throw new Error(`Registration failed: ${netErr}`);
    }
  }

  // Team flow (unchanged)
  const res = await fetch(buildApiUrl(`/event_reg/create`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      members_ky_ids: [params.kyid],
      team_name: params.teamName || "",
      event_id: params.eventId,
    }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json().catch(() => ({}));
}

const EventDetails: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Safety check for missing ID
  if (!id) {
    return (
      <div className="text-white text-center mt-20">
        Event not found
      </div>
    );
  }

  // ✅ Find matching event category
  const key = Object.keys(eventsData).find(
    (k) => k.toLowerCase() === id.toLowerCase()
  );

  if (!key) {
    return (
      <div className="text-white text-center mt-20">
        Event not found in data
      </div>
    );
  }

  const eventArray = eventsData[key as keyof typeof eventsData];

  if (!eventArray || eventArray.length === 0) {
    return (
      <div className="text-white text-center mt-20">
        No events found in array
      </div>
    );
  }

  // Local storage keys per category
  const TICKET_LS_KEY = `ky_${key}_ticket`;
  const REG_LS_KEY = `ky_${key}_registered`;

  // Track ticket and registration state
  const [ticketType, setTicketType] = React.useState<string | null>(null);
  const [registered, setRegistered] = React.useState<Record<number, boolean>>({});
  const [eventCounts, setEventCounts] = React.useState<Record<number, {teamCount:number; participantCount:number}>>({});

  // Load persisted state
  React.useEffect(() => {
    try {
      const savedTicket = localStorage.getItem(TICKET_LS_KEY);
      if (savedTicket) {
        const parsed = JSON.parse(savedTicket);
        if (parsed?.ticketType) setTicketType(parsed.ticketType);
      }
      const savedReg = localStorage.getItem(REG_LS_KEY);
      if (savedReg) {
        setRegistered(JSON.parse(savedReg) || {});
      }
    } catch {
      // swallow
    }
  }, [TICKET_LS_KEY, REG_LS_KEY]);

  // Handle payment callback via query params, confirm with backend, persist, and clean URL
  React.useEffect(() => {
    const result = parsePaymentResult(location.search);
    if (result.status === "success" && result.ticketType) {
      confirmPaymentRequest({
        category: key,
        ticketType: result.ticketType,
        txId: result.txId,
        // Use shared secret discovered/generated above
        secret: SHARED_SECRET,
      })
        .then(() => {
          setTicketType(result.ticketType!);
          localStorage.setItem(
            TICKET_LS_KEY,
            JSON.stringify({ ticketType: result.ticketType })
          );
        })
        .finally(() => {
          // Clean the URL so buttons don't re-trigger on reload
          navigate({ pathname: location.pathname }, { replace: true });
        });
    }
  }, [location.search, key, TICKET_LS_KEY, navigate, location.pathname]);

  // Fetch registration counts for displayed events
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      for (const ev of eventArray) {
          try {
            const res = await fetch(buildApiUrl(`/event_reg/count`), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ event_id: ev.eventId }),
          });
          if (!mounted) return;
          if (res.ok) {
            const j = await res.json();
            setEventCounts((prev) => ({
              ...prev,
              [ev.eventId]: { teamCount: j.team_count || 0, participantCount: j.participant_count || 0 },
            }));
          }
        } catch (e) {
          // ignore network errors
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [eventArray]);

  const { userInfo, authTokens, setInfoFromToken } = React.useContext(AuthContext);

  // Consider backend paymentStatus as well as any local ticketType saved by
  // the payment flow. This fixes the case where a user has `paymentStatus`
  // true on their profile but no local ticketType (so the UI previously
  // showed "Payment Due" incorrectly).
  const hasPaidTicket = !!ticketType || !!userInfo?.paymentStatus;

  // If the user's purchased ticket is a zonal ticket (Zonals Single/Multi),
  // they should not be allowed to register for non-zonal competition events.
  const isZonalTicket = !!ticketType && /zonal/i.test(ticketType);
  const handleRegister = async (idx: number, eventId?: number) => {
    // Allow registration when either a ticketType exists or backend reports
    // paymentStatus on the user's profile.
    if (!ticketType && !userInfo?.paymentStatus) return;
    const kyid = userInfo?.ky_id;
    if (!kyid) {
      // If user not logged in, navigate to login or show message
      navigate("/login");
      return;
    }

    try {
      // call backend
      await registerOnBackend({ eventId: eventId ?? 0, kyid });

      // Update local registered state so UI shows Registered immediately
      setRegistered((prev) => {
        const next = { ...prev, [idx]: true };
        localStorage.setItem(REG_LS_KEY, JSON.stringify(next));
        return next;
      });

      // Refresh profile from backend so Dashboard and other components
      // see updated registered events / paymentStatus.
      if (authTokens?.access && typeof setInfoFromToken === "function") {
        try {
          await setInfoFromToken(authTokens.access);
        } catch (err) {
          console.error("Error refreshing profile after register:", err);
        }
      }

      toast.success("Registered successfully");
    } catch (err: any) {
      console.error("Registration error:", err);
      // Try to show backend error message when available
      const message = err?.message || "Registration failed";
      toast.error(message);
    }
  };

  // =========================
  // 🎨 Gradient heading styles
  // =========================
  const eventHeadingStyle: CSSProperties = {
    fontWeight: 700,
    background: "linear-gradient(93.83deg, #FFD966 0%, #C285E0 40%, #7D8FE8 100%)",
    backgroundSize: "200% 200%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
    display: "block",
    width: "fit-content",
    marginInline: "auto",
  };

  const mainHeadingStyle: CSSProperties = {
    fontWeight: 700,
    background: "linear-gradient(to right, #B36BFF, #00F2FF)",
    backgroundSize: "200% 200%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
    display: "block",
    width: "fit-content",
    marginInline: "auto",
  };

  // =========================
  // 🧠 Render component
  // =========================
  return (
    <div className="min-h-screen bg-[#0b0016] text-white flex flex-col items-center py-10">
      <Navbar /> {/* Navbar component added :Aryan'23 */}

      {/* Main Category Heading */}
      <h1 className="text-4xl font-bold mb-6 mt-16" style={mainHeadingStyle}>
        {key} Events
      </h1>

      {/* =========================
          Sub-Event Rendering Loop
      ========================= */}
      {eventArray.map((event, index) => (
        <div
          key={index}
          className="w-full max-w-4xl p-6 border-b border-gray-700 last:border-b-0 mb-3"
        >
          <h2
            className="text-3xl py-2 font-semibold mb-4 text-center"
            style={eventHeadingStyle}
          >
            {event.title}
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center md:items-start gap-6">
            <TrimmedImage
              src={event.image}
              alt={event.title}
              className="rounded-xl shadow-lg w-full md:w-[40%] max-w-[300px] flex-shrink-0 object-cover self-center"
            />
            <div className="text-left w-full">
              <p className="text-xl text-yellow-400 font-semibold mb-4 font-delius">
                {event.description}
              </p>
              <p className="text-md text-gray-300 mb-6">{event.details}</p>
              <p className="text-yellow-400 text-lg font-semibold">
                Type: {event.type} Event
              </p>

              {/* show registration counts (teams / participants) */}
              {eventCounts[event.eventId] && (
                <p className="text-sm text-gray-300 mt-2">
                  
                </p>
              )}

              {/* Minimal payment/registration actions */}
              <div className="mt-4">
                {!hasPaidTicket ? (
                  <a
                    href={`/payment?category=${encodeURIComponent(
                      key
                    )}&returnUrl=${encodeURIComponent(
                      window.location.href
                    )}&eventId=${event.eventId}`}
                    className="inline-block bg-purple-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md"
                  >
                    Payment Due
                  </a>
                ) : isZonalTicket && key !== "Zonals" ? (
                  <div className="inline-flex items-center gap-3">
                    <button
                      disabled
                      className="inline-block bg-gray-600 text-white px-4 py-2 rounded-md cursor-not-allowed"
                    >
                      Not eligible
                    </button>
                    <span className="text-sm text-gray-300">
                      Zonal ticket holders cannot register for these events. Please use the
                      <a href="/zonals-register" className="text-yellow-300 ml-1 underline"> Zonals portal</a>.
                    </span>
                  </div>
                ) : registered[index] ? (
                  <button
                    disabled
                    className="inline-block bg-gray-600 text-white px-4 py-2 rounded-md cursor-not-allowed"
                  >
                    Registered
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegister(index, event.eventId)}
                    className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md"
                  >
                    Register
                  </button>
                )}
                {hasPaidTicket && ticketType && (
                  <span className="ml-3 text-sm text-gray-300 align-middle">
                    Ticket: {ticketType}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {key && contactData[key as keyof typeof contactData] && (
        <div className="text-yellow-400 text-lg font-bold text-center mb-6">
          For more details contact:
          <div className="mt-2 space-y-2">
            {contactData[key as keyof typeof contactData]
              .slice(0, 2)
              .map((contact, index) => (
                <div key={index} className="text-white">
                  {contact.name} ({contact.phone})
                </div>
              ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default EventDetails;
