// import { Navbar } from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import SponsorsLogos from "@/components/SponsorsLogos";

// const Sponsors = () => {
//   const sponsorImages = [
//     { src: "/Sponsors_logo/Coca-Cola_logo.png", alt: "Coca-Cola" },
//     { src: "/Sponsors_logo/DBL.png", alt: "DBL" },
//     { src: "/Sponsors_logo/GAIL.png", alt: "GAIL" },
//     { src: "/Sponsors_logo/wcl.png", alt: "WCL" },
//     { src: "/Sponsors_logo/NMDC Logo - Name.jpg", alt: "NMDC" },
//     { src: "/Sponsors_logo/RAZEX.png", alt: "RAZEX" },
//     { src: "/Sponsors_logo/Next IAS.webp", alt: "Next IAS" },
//     { src: "/Sponsors_logo/Acer.jpg", alt: "Acer" },
//     { src: "/Sponsors_logo/Hyundai.png", alt: "Hyundai" },
//     { src: "/Sponsors_logo/Yamaha.jpg", alt: "Yamaha" },
//     { src: "/Sponsors_logo/Lucknow_Super_Giants_IPL_Logo.png", alt: "Lucknow Super Giants" },
//     { src: "/Sponsors_logo/Navneeta grand.png", alt: "Navneeta Grand" },
//     { src: "/Sponsors_logo/TECHGYAN.jpg", alt: "TECHGYAN" },
//     { src: "/Sponsors_logo/EDU FAB.jpg", alt: "EDU FAB" },
//     { src: "/Sponsors_logo/MOIL.png", alt: "MOIL" },
//     { src: "/Sponsors_logo/MAHWS.jpg", alt: "MAHWS" },
//     { src: "/Sponsors_logo/SRI SAI.jpg", alt: "SRI SAI" },
//     { src: "/Sponsors_logo/Nestle.jpg", alt: "Nestle" },
//     { src: "/Sponsors_logo/Pulse.png", alt: "Pulse" },
//     { src: "/Sponsors_logo/HDFC logo.png", alt: "HDFC" },
//     { src: "/Sponsors_logo/ICICI.png", alt: "ICICI" },
//     { src: "/Sponsors_logo/NDC.jpg", alt: "NDC" },
//     { src: "/Sponsors_logo/Sunbeam.png", alt: "Sunbeam" },
//     { src: "/Sponsors_logo/ADDA 52.png", alt: "ADDA 52" },
//     { src: "/Sponsors_logo/Amul-Logo.jpg", alt: "Amul" },
//     { src: "/Sponsors_logo/CMPDI.png", alt: "CMPDI" },
//     { src: "/Sponsors_logo/Denver.jpeg", alt: "Denver" },
//     { src: "/Sponsors_logo/Spykar.png", alt: "Spykar" },
//     { src: "/Sponsors_logo/XP-Pen.png", alt: "XP-Pen" },
//     { src: "/Sponsors_logo/Jio saavn.png", alt: "Jio Saavn" },
//     { src: "/Sponsors_logo/College brand connect.png", alt: "College Brand Connect" },
//     { src: "/Sponsors_logo/Smart and handsome.png", alt: "Smart and Handsome" },
//     { src: "/Sponsors_logo/gaana.webp", alt: "Gaana" },
//     { src: "/Sponsors_logo/Unstop.svg", alt: "Unstop" },
//     { src: "/Sponsors_logo/Red fm.png", alt: "Red FM" },
//     { src: "/Sponsors_logo/blogadda.png", alt: "BlogAdda" },
//     { src: "/Sponsors_logo/wayspire.png", alt: "Wayspire" },
//     { src: "/Sponsors_logo/d2d story.webp", alt: "D2D Story" },
//     { src: "/Sponsors_logo/EaseMyTrip.svg", alt: "EaseMyTrip" },
//   ];

//   return (
//     <>
//       <Navbar />
//       <div
//         className="w-full min-h-screen flex flex-col justify-between text-white"
//         style={{
//           background:
//             "linear-gradient(180deg, #100318 0%, #310D3D 15%, #6A3E92 35%, #310D3D 70%, #100318 100%)",
//         }}
//       >
//         <div className="pt-24 md:pt-32"> {/* ADDED FIXED TOP PADDING HERE */}
//           {/* Title Section */}
//           <div className="flex justify-center"> {/* REMOVED OLD PT CLASSES */}
//             <h1
//               className="heading-gradient text-center"
//               style={{
//                 fontSize: "clamp(1.5rem, 9vw, 5rem)",
//               }}
//             >
//               Sponsors
//             </h1>
//           </div>

//           {/* Title Sponsor Section */}
//           <div className="flex justify-center pt-[3%] pb-[1%]">
//             <h2
//               className="heading-gradient text-center"
//               style={{
//                 fontSize: "clamp(1.3rem, 6vw, 3.2rem)",
//               }}
//             >
//               Title Sponsor
//             </h2>
//           </div>
//           <div className="flex justify-center">
//             <div className="w-[85%] sm:w-[55%] aspect-[4/1] flex items-center justify-center">
//               <img
//                 src="./Sponsors_logo/Royal_Enfield.png"
//                 alt="Title Sponsor - Royal Enfield"
//                 className="w-full h-full object-contain"
//                 loading="lazy"
//               />
//             </div>
//           </div>

//           {/* Co-Sponsor Section */}
//           <div className="flex justify-center pt-[3%] pb-[1%]">
//             <h2
//               className="heading-gradient text-center"
//               style={{
//                 fontSize: "clamp(1.2rem, 5.5vw, 3rem)",
//               }}
//             >
//               Co-Title Sponsors
//             </h2>
//           </div>
//           <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
//             <img
//               src="./Sponsors_logo/Tata_Power_Stacked_Logo-01.png"
//               alt="Co-Sponsor - Tata Power"
//               className="w-20 sm:w-32 md:w-52 lg:w-60"
//               loading="lazy"
//             />
//             <img
//               src="./Sponsors_logo/Up_Tourism_Hindi_FurtherEnhanced.png"
//               alt="Co-Sponsor - UP Tourism"
//               className="w-20 sm:w-32 md:w-52 lg:w-60"
//               loading="lazy"
//             />
//             <img
//               src="./Sponsors_logo/SBI.png"
//               alt="Co-Sponsor - SBI"
//               className="w-20 sm:w-32 md:w-52 lg:w-60"
//               loading="lazy"
//             />
//           </div>

//           {/* Powered By Section */}
//           <div className="flex justify-center pt-[3%] pb-[1%]">
//             <h2
//               className="heading-gradient text-center"
//               style={{
//                 fontSize: "clamp(1.2rem, 5.5vw, 3rem)",
//               }}
//             >
//               Powered By
//             </h2>
//           </div>
//           <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
//             <img
//               src="./Sponsors_logo/POWERGRID Logo.jpg"
//               alt="Co-Powered By PowerGrid"
//               className="w-20 sm:w-32 md:w-52 lg:w-60"
//               loading="lazy"
//             />
//             <img
//               src="./Sponsors_logo/NTPC.png"
//               alt="Powered By - NTPC"
//               className="w-20 sm:w-32 md:w-52 lg:w-60"
//               loading="lazy"
//             />
//             <img
//               src="./Sponsors_logo/Veranda_Learning_Logo.png"
//               alt="Co-Powered By Veranda Learning"
//               className="w-20 sm:w-32 md:w-52 lg:w-60"
//               loading="lazy"
//             />
//           </div>

//           {/* General Sponsors Section */}
//           <div className="flex justify-center pt-[3%] pb-[1%]">
//             <h2
//               className="heading-gradient text-center"
//               style={{ fontSize: "clamp(1.3rem, 6vw, 3.2rem)" }}
//             >
//               Sponsors
//             </h2>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 px-4 mb-8 justify-items-center">
//             {sponsorImages.map((sponsor, index) => (
//               <div key={index} className="w-28 md:w-32 lg:w-36">
//                 <SponsorsLogos src={sponsor.src} alt={sponsor.alt} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Sponsors;
import Footer from "@/components/Footer"
import { Navbar } from "@/components/Navbar"

const sp = () => {
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

export default sp
