import { useState, useEffect, useContext } from "react";
//import { NavBtn } from "./NavBtn";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AuthContext from "@/Context/AuthContext";
import { Link, useLocation } from "react-router-dom";

gsap.registerPlugin(useGSAP);

export function Navbar() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { logoutUser, userInfo } = useContext(AuthContext);
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = location.pathname === "/";
  const [paymentStatus, setPaymentStatus] = useState(userInfo?.paymentStatus);
  const [isLogged, setIsLogged] = useState(false);

  // Scroll transparency logic
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      const threshold = 900;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    setPaymentStatus(userInfo?.paymentStatus);
  }, [userInfo?.paymentStatus]);

  useEffect(() => {
    const authToken = localStorage.getItem("authTokens");
    setIsLogged(!!authToken);
  }, []);

  const toggleOverlay = () => setIsOverlayOpen(!isOverlayOpen);
  const closeOverlay = () => setIsOverlayOpen(false);

  const navBgClass = isHomePage
    ? isScrolled
      ? "bg-black shadow-md"
      : "bg-transparent"
    : "bg-black shadow-md";

  return (
    <>
      {/* Dark background overlay behind mobile menu */}
      <div
        className={`fixed top-0 left-0 z-40 w-full h-screen bg-black/70 pointer-events-none ${
          isOverlayOpen ? "" : "hidden"
        }`}
      ></div>

      {/* ✨ MOBILE OVERLAY MENU */}
      <div
        className={`overlay w-full h-screen top-0 left-0 fixed z-50 flex flex-col lg:flex-row overflow-hidden overflow-y-auto 
          ${isOverlayOpen ? "clip-path-animation" : "clip-path-animation-exit"}
        `}
        style={{
          background:
            "linear-gradient(180deg, #100318C0 0%, #310D3DA0 15%, #6A3E92A0 35%, #310D3DA0 70%, #100318C0 100%), url(/throwbackBg.webp)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          color: "#E8DCC6",
        }}
      >
        {/* Left: Logo + Close */}
        <div className="w-full lg:w-1/2 h-1/3 lg:h-full flex items-center justify-center relative">
          <div className="w-[12rem] h-[3rem] md:w-44 md:h-20 lg:w-96">
            <Link to="/">
              <img
                className="w-full h-full"
                src="/KY_logo.svg"
                alt="KY Logo"
                style={{ objectFit: "cover" }}
              />
            </Link>
          </div>
          <button
            onClick={closeOverlay}
            className="lg:hidden absolute top-4 right-4 bg-transparent text-[#E8DCC6] border border-[#E8DCC6]/50 hover:bg-[#E8DCC6] hover:text-[#3E0F0F] transition-all text-xs h-8 w-14 font-semibold rounded-full"
          >
            Close
          </button>
        </div>

        {/* Right: Navigation links */}
        <div className="w-full lg:w-1/2 h-full rounded-t-3xl lg:rounded-none bg-[#6A3E92]/60 backdrop-blur-md p-6 shadow-lg overflow-y-auto">
          <div className="hidden lg:flex w-full justify-end mb-8 mt-3">
            <button
              onClick={closeOverlay}
              className="hover:bg-[#E8DCC6] hover:text-[#2C006A] transition-all text-sm font-semibold h-9 w-20 border border-[#E8DCC6]/50 flex items-center justify-center rounded-full"
            >
              Close
            </button>
          </div>

          {/* Mobile nav items */}
          <div
            onClick={closeOverlay}
            className="flex flex-col items-center lg:items-start font-semibold text-lg space-y-3 text-[#E8DCC6] pb-12"
          >
            {[
              // ["Zonals", "/competitions/zonals"],
              ...(!isHomePage ? [["Home","/"]] : []),
              ["Pre-Event", "/pre-events"],
              ["Competitions", "/competitions"],
              ["Events", "/events"],
              ["Sponsors", "/sponsors"],
              // ["Teams", "/teams"],
              // ["Merch", "/merch"],
              ["Profile", "/profile"],
              // Add CA back into the list as a Link
              ["CA", "/ca"],
            ["Pay Now", "/payment"],
            ].map(([title, link]) => (
              <Link
                key={title}
                to={link}
                className="relative transition-colors duration-200 hover:scale-105 hover:text-[#72D0EA] after:content-[''] after:block after:w-0 hover:after:w-full after:h-[1px] after:bg-[#72D0EA] after:transition-all after:duration-300"
              >
                {title}
              </Link>
            ))}

            {/* Removed the separate external <a> tag for CA */}
            {/* The Login/Logout buttons remain at the bottom */}
            
            {!isLogged ? (
              <Link
                to="/login"
                className="relative transition-colors duration-200 hover:scale-105 hover:text-[#72D0EA] after:content-[''] after:block after:w-0 hover:after:w-full after:h-[1px] after:bg-[#72D0EA] after:transition-all after:duration-300"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logoutUser}
                className="relative transition-colors duration-200 hover:scale-105 hover:text-[#72D0EA] after:content-[''] after:block after:w-0 hover:after:w-full after:h-[1px] after:bg-[#72D0EA] after:transition-all after:duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 🟣 DESKTOP NAVBAR (unchanged) */}
      <div
        id="nav"
        className={`h-14 w-full fixed top-0 z-[99999] flex items-center font-gilroy justify-between text-[#FAFAFAFA] px-4 md:px-8 transition-colors duration-300 ${navBgClass} ${
          isOverlayOpen ? "hidden" : ""
        }`}
      >
        <div className="h-[0.9rem] w-[4rem] md:h-8 md:w-32">
          <Link to="/">
            <img
              className="w-full h-full"
              src="/KY_logo.svg"
              alt="Kashiyatra Logo"
              style={{ objectFit: "cover" }}
            />
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {!isHomePage && (
              <Link
                to="/"
                className="hover:text-[#D2C1A1] transition-colors duration-200"
              >
                Home
              </Link>
            )}
            <Link
              to="/pre-events"
              className="hover:text-[#D2C1A1] transition-colors duration-200"
            >
              Pre-Event
            </Link>
            <Link
              to="/competitions"
              className="hover:text-[#D2C1A1] transition-colors duration-200"
            >
              Competitions
            </Link>
            <Link
              to="/events"
              className="hover:text-[#D2C1A1] transition-colors duration-200"
            >
              Events
            </Link>
            {/* <Link
              to="/competitions/zonals"
              className="hover:text-[#D2C1A1] transition-colors duration-200"
            >
              Zonals
            </Link> */}
            <Link
              to="/sponsors"
              className="hover:text-[#D2C1A1] transition-colors duration-200"
            >
              Sponsors
            </Link>
            {/* <Link
              to="/teams"
              className="hover:text-[#D2C1A1] transition-colors duration-200"
            >
              Teams
            </Link> */}
            {/* <Link
              to="/merch"
              className="hover:text-[#D2C1A1] transition-colors duration-200"
            >
              Merchandise
            </Link> */}
            <Link
              to="/profile"
              className="hover:text-[#D2C1A1] transition-colors duration-200"
            >
              Profile
            </Link>
            <Link
             to="/ca"
             className="hover:text-[#D2C1A1] transition-colors duration-200"
            >
              CA
            </Link>
          </nav>

          {!isLogged ? (
            <Link
              to="/register"
              className="hidden lg:flex bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200 items-center justify-center text-sm"
            >
              Register Now
            </Link>
          ) : (
            !paymentStatus && (
              <Link
                to="/payment"
                className="hidden lg:flex bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200 items-center justify-center text-sm"
              >
                Pay Now
              </Link>
            )
          )}

          <button
            onClick={toggleOverlay}
            className="lg:hidden h-7 w-7 flex items-center justify-center transition-all rounded-full border border-white/20"
            style={{
              background: "rgba(0, 0, 0, 0.69)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
