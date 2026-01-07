import Card from "@/components/Card";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar"; // Assuming this is the correct new Navbar
import { Outlet, useLocation } from "react-router-dom";
import { CSSProperties } from "react"; // Needed for inline styles

const Competition = () => {
  const location = useLocation();
  const isSubRoute = location.pathname !== "/competitions"; // Check if we're on a subroute

  const fileUrl = '/rulebook.pdf'; // Replace with your file URL  

  // Define the styles for the gradient heading (from the new code)
  const eventHeadingStyle: CSSProperties = {
    fontFamily: 'Urbanist, sans-serif', // Assuming Urbanist is the font to use
    fontWeight: 700,
    fontStyle: 'italic',
    background: 'linear-gradient(93.83deg, #FFD966 0%, #C285E0 40%, #7D8FE8 100%)',
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    display: 'block',
    width: 'fit-content',
  };

  // Define the gradient background for the whole page (from the new code)
  const pageBackgroundStyle: CSSProperties = {
    background: "linear-gradient(180deg, #100318 0%, #310D3D 15%, #6A3E92 35%, #310D3D 70%, #100318 100%)",
  };


  return (
    <>
      <Navbar />
      <div 
        className="w-full min-h-screen overflow-hidden pt-20" // Replaced bg-[#430B04] with gradient via style
        style={pageBackgroundStyle}
      >
        {!isSubRoute ? (
          <>
            {/* APPLY NEW STYLING TO THE HEADING */}
            <div className="w-screen flex flex-col justify-center items-center pt-10 pb-8">

              <h1
                className="text-5xl text-center p-2 animate-gradientText"
                style={eventHeadingStyle}
              >
                Competitions
              </h1>

              {/* Button should NOT be inside <h3> */}
              <div className="mt-4">
                <button
                  onClick={() => window.open(fileUrl, "_blank")}
                  className="px-3 py-2 text-lg rounded-full border-2 transition hover:scale-105"
                  style={{
                    backgroundColor: "violet", 
                    borderColor: "#D2C1A1",       // gold border
                    color: "black",             // violet text
                    fontFamily: "Urbanist, sans-serif",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                  }}
                >
                  Download RuleBook
                </button>
              </div>

            </div>


            <div className="flex flex-col md:flex-row flex-wrap gap-x-2 gap-y-16 justify-around items-center pb-20">
              <Card imageUrl="https://kashiyatra.s3.eu-north-1.amazonaws.com/natraj.webp" clockwise link="natraj" rotDeg={3} />
              <Card
                imageUrl="https://kashiyatra.s3.eu-north-1.amazonaws.com/cross.webp"
                clockwise={false}
                link="crosswindz"
                rotDeg={3}
              />
              <Card
                imageUrl="https://kashiyatra.s3.eu-north-1.amazonaws.com/bandish.webp"
                clockwise
                link="bandish"
                rotDeg={3} />
              
              <Card imageUrl="https://kashiyatra.s3.eu-north-1.amazonaws.com/abhinay.webp" clockwise link="abhinay" rotDeg={3} />
              <Card
                imageUrl="https://kashiyatra.s3.eu-north-1.amazonaws.com/mirage.webp"
                clockwise={false}
                link="mirage"
                rotDeg={3}
              />
              <Card imageUrl="https://kashiyatra.s3.eu-north-1.amazonaws.com/toolika.webp" clockwise link="toolika" rotDeg={3} />
              <Card
                imageUrl="https://kashiyatra.s3.eu-north-1.amazonaws.com/enquizta.webp"
                clockwise={false}
                link="enquizta"
                rotDeg={3}
              />
              <Card
                imageUrl="https://kashiyatra.s3.eu-north-1.amazonaws.com/samwaad.webp"
                clockwise={false}
                link="samwaad"
                rotDeg={3}
              />
              <Card imageUrl="https://kashiyatra.s3.eu-north-1.amazonaws.com/zaika.webp" clockwise link="zaika" rotDeg={3} />
            </div>
            <div className="text-center mb-6 font-bold">
              <div className="text-yellow-400 text-3xl mb-2">For more details contact:</div>
              <div className="flex flex-col items-center text-white text-lg space-y-2">
                <span className="mb-1">Ajay (8076203750)</span>
                <span>Gaurav (9311063656)</span>
                <span>Sujal (7070430071)</span>
                <span>Samiksha (8624046139)</span>
              </div>
            </div>
            <Footer />
          </>
        ) : (
          <div className="w-full min-h-screen">
            {/* This div should still receive the background gradient if the Outlet content is transparent */}
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
};

export default Competition;
