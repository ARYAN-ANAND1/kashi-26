import Footer from "@/components/Footer"
import { Navbar } from "@/components/Navbar"

const ComingSoon = () => {
  const text = "Coming Soon..."
  return (
    <>
      <style>{`
        .char {
          opacity: 0;
          transform: translateY(8px) scale(0.98);
          display: inline-block;
          animation: reveal 360ms cubic-bezier(.2,.8,.2,1) forwards;
          will-change: transform, opacity;
        }
        .heading-gradient {
          display: inline-block;
        }
        .heading-gradient .char {
          background: inherit;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        @keyframes reveal {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      <Navbar />
      <div 
        className='w-full h-screen flex justify-center items-center text-6xl font-uncial text-[#D2C1A1]'
        style={{
          background: "linear-gradient(180deg, #100318 0%, #310D3D 15%, #6A3E92 35%, #310D3D 70%, #100318 100%)"
        }}
      >
        <h1 className='heading-gradient'>
          {text.split("").map((ch, i) => (
            <span
              key={i}
              className="char inline-block"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
      </div>
      <Footer />
    </>
  )
}

export default ComingSoon
