import { useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import instagramIcon from "../assets/instagram2.png"; 

gsap.registerPlugin();

function Footer() {
  const logoRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, delay: 0.2 }
    );
  }, []);

  return (
    <footer
      className="w-full text-white pt-16 pb-8 px-4 sm:px-10 lg:px-20 relative"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(128, 51, 204, 0) 0%, rgba(128, 51, 204, 0.05) 50%, rgba(128, 51, 204, 0) 100%), linear-gradient(180deg, #070708 0%, rgba(19, 19, 22, 1) 100%)',
        backgroundColor: '#070708',
        color: '#A1A1AA',
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-y-12 gap-x-6 pb-12 border-b border-white/10 place-items-center md:place-items-start">

        {/* Column 1: Kashiyatra Info (Desktop Only) */}
        <div className="hidden md:flex flex-col space-y-3 col-span-2 md:col-span-1">
          <div className="space-y-1" ref={logoRef}>
            <h3
              className="font-normal"
              style={{
                fontFamily: 'Urbanist, sans-serif',
                fontWeight: 400,
                fontSize: '30px',
                lineHeight: '36px',
                backgroundImage: 'linear-gradient(96.71deg, #FFD966 0%, #C285E0 50%, #7D8FE8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Kashiyatra'26
            </h3>
            <p className="text-sm font-light text-purple-400">Nirvanam - Echoes of Elysian</p>
          </div>
          <p className="text-sm text-white/70">
            India's largest cultural college festival at IIT (BHU), Varanasi.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="hidden md:flex flex-col space-y-3">
          <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
          <Link to="/" className="hover:text-white text-sm">Home</Link>
          <Link to="/pre-events" className="hover:text-white text-sm">Pre-Event</Link>
          <Link to="/competitions" className="hover:text-white text-sm">Competitions</Link>
          <Link to="/events" className="hover:text-white text-sm">Events</Link>
          {/* <Link to="/merch" className="hover:text-white text-sm">Merchandise</Link> */}
        </div>

        {/* Column 3: Connect Links */}
        <div className="hidden md:flex flex-col space-y-3">
          <h4 className="text-lg font-semibold text-white mb-2">Connect Links</h4>
          <Link to="/contact" className="hover:text-white text-sm">Contact</Link>
          <Link to="/sponsors" className="hover:text-white text-sm">Sponsors</Link>
          <Link to="/register" className="hover:text-white text-sm">Register</Link>
          <Link to="/ca" className="hover:text-white text-sm">CA</Link>
        </div>

        {/* Column 4: Contact For Collaboration */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          {/* Mobile-only Kashiyatra Info */}
          <div className="flex flex-col space-y-2 mb-4 md:hidden items-center text-center">
  <img
    src="/KY_logo.svg"
    alt="Kashiyatra Logo"
    className="w-32 h-auto" // adjust width/height as needed
  />
</div>

          <h4 className="text-lg font-semibold text-white mb-2 text-center md:text-left">Contact For Collaboration</h4>
          <a
            href="mailto:kashiyatra@iitbhu.ac.in"
            className="flex items-center gap-3 hover:text-white text-sm"
          >
            <FaEnvelope className="w-5 h-5 fill-current text-white-400 flex-shrink-0" />
            <span>kashiyatra@iitbhu.ac.in</span>
          </a>
          <a
            href="https://whatsapp.com/channel/0029VasYb6LBadmaaBUHjP3t"
            className="flex items-center gap-3 hover:text-white text-sm"
          >
            <FaWhatsapp className="w-5 h-5 fill-current text-green-400 flex-shrink-0" />
            <span>Join Whatsapp Community</span>
          </a>
          <a
            href="https://instagram.com/kashiyatra_iitbhu"
            className="flex items-center gap-3 hover:text-white text-sm"
          >
            <img src={instagramIcon} alt="Instagram" className="w-5 h-5 object-contain flex-shrink-0" />
            <span>Join Instagram Community</span>
          </a>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center pt-4 text-xs text-white/50 text-center sm:text-left">
        <p>©️ {new Date().getFullYear()} Kashiyatra, IIT (BHU) Varanasi. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Made with passion by Team Kashiyatra</p>
      </div>
    </footer>
  );
}

export default Footer;
