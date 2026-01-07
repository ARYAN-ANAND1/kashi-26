import React,{ReactNode} from "react"
import Footer from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
interface SlantedCardProps {
  price: string;
  children: ReactNode; // <-- ADD THIS LINE
}
const SlantedCard: React.FC<SlantedCardProps> = ({ price,children }) => {
  return (
    <div className="relative w-80 md:w-[420px] h-64 md:h-[280px]">
      {/* Animated neon gradient border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient with shifting neon colors */}
          <linearGradient id="neonGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFEA00" />
            <stop offset="25%" stopColor="#FF00E6" />
            <stop offset="50%" stopColor="#00FFFF" />
            <stop offset="75%" stopColor="#FFEA00" />
            <stop offset="100%" stopColor="#FF00E6" />
          </linearGradient>
        </defs>
        <path
          d="M8,0 L100,0 L92,100 L0,100 Z"
          fill="none"
          stroke="url(#neonGradient)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          className="animated-neon-border"
        />
      </svg>

      {/* Main card area */}
      <div className="absolute inset-[5px] bg-[#1a0327]/90 clip-slant rounded-[20px] flex flex-col justify-between px-6 py-4">
        <div className="flex justify-end">
          <div className="text-[#D2C1A1] text-lg font-semibold">{price}</div>
        </div>
        <div className="flex-1" />
        <div className="h-1 w-14 bg-[#d2c17e]/60 rounded-sm" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  )
}

const Merchandise = () => {
  return (
    <>
      <Navbar />
      
      <main
        className="w-full min-h-screen flex flex-col items-center pt-28 md:pt-32 pb-16 px-6"
        style={{
          background:
            "linear-gradient(180deg, #100318 0%, #310D3D 15%, #6A3E92 35%, #310D3D 70%, #100318 100%)",
        }}
      >
        
        <h1
  className="text-transparent bg-clip-text text-[30px] sm:text-[40px] md:text-[50px] leading-[34px] sm:leading-[44px] md:leading-[54px] text-center mb-1 sm:mb-2"
  style={{
    backgroundImage:
      "linear-gradient(94.47deg, #FFD966 0%, #C285E0 50%, #7D8FE8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily: "Macondo Swash Caps",
    fontWeight: 400,
    fontStyle: "normal",
    letterSpacing: "0%",
  }}
>
  Merchandise
</h1>
  

        {/* Two slanted cards side-by-side */}
        <section className="w-full max-w-6xl flex flex-col md:flex-row justify-center items-center gap-6 xs:gap-12">
        <SlantedCard price="₹850">
          <img src="https://res.cloudinary.com/ddvl77vdy/image/upload/v1764217094/my_repo_images/kwinyxp4t0rip7uhoqax.webp" alt="first merchandise" className="w-full h-full object-cover"/>
        </SlantedCard>
          <SlantedCard price="₹850">
            <img src="https://res.cloudinary.com/ddvl77vdy/image/upload/v1764217093/my_repo_images/dpox9aimquhqfh3u2mwf.webp" alt="second merchandise" className="w-full h-full object-cover"/>
          </SlantedCard>
        </section>

  {/* QR section */}
<div className="flex flex-col items-center justify-center mt-16 w-full">
  {/* ✅ NEW BUTTON */}
  <button
    onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSenHF9c2ugBaaXw8WzwzdaEyEGFpHtV_qV5Y5REwkERwDNp1Q/viewform", "_blank")} 
    className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition-all text-lg"
  >
    Click Here to Order
    <p className="text-sm text-gray-300 mt-2 italic">
      (open with institute mail only)
    </p>
  </button>
  
  <p className="text-white/70 text-lg mt-5 mb-4 font-urbanist">or</p>
  <div className="w-32 h-32 bg-[#E6E6E6] rounded-md mb-3 shadow-md overflow-hidden">
    <img 
      src="https://res.cloudinary.com/ddvl77vdy/image/upload/v1764217138/my_repo_images/gj4zjlgum1xofr9e6oal.webp"
      alt="preview"
      className="w-full h-full object-cover"
    />
  </div>
  <p
    className="text-transparent bg-clip-text text-[24px] sm:text-[32px] md:text-[40px] leading-[28px] sm:leading-[38px] md:leading-[46px] text-center mt-4"
    style={{
      backgroundImage:
        "linear-gradient(94.47deg, #FFD966 0%, #C285E0 50%, #7D8FE8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontFamily: "Urbanist",
      fontWeight: 400,
      fontStyle: "normal",
      letterSpacing: "0%",
    }}
  >
    Scan to Order
  </p>
</div>

      </main>
      <Footer />
    </>
  )
}

export default Merchandise;
