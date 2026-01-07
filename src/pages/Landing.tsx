import { useState, useEffect, CSSProperties } from "react";
import { Navbar } from "@/components/Navbar";
import { Meteors } from "@/components/ui/meteors";
import { useNavigate, Link } from "react-router-dom"; 

const Landing = () => {

    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem("authTokens");
        console.log(authToken);
        setIsLogged(!!authToken);
    }, []);

    const kashiyatraStyle: CSSProperties = {
      fontFamily: 'Syncopate, sans-serif',
      fontWeight: 700,
      letterSpacing: '0%',
      textAlign: 'center',
      
      // FIX: Keep only gradient stylings 
      backgroundImage: 'linear-gradient(95.36deg, #FFCC33 0%, #FFBF66 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent',
      
      // REMOVED: fontSize and lineHeight to let Tailwind control responsiveness
      whiteSpace: 'nowrap',
  };

  const taglineStyle: CSSProperties = {
    fontFamily: 'Urbanist, sans-serif',
    fontWeight: 400,
    textAlign: 'center',
    
    // Using solid color for high contrast
    color: '#FFEB3B', 
    WebkitTextFillColor: '#FFEB3B',
    backgroundImage: 'none', 
    backgroundClip: 'unset',
    WebkitBackgroundClip: 'unset',
    
    // REMOVED: fontSize to let Tailwind control responsiveness
    whiteSpace: 'nowrap',
};

    const IITBHUStyle: CSSProperties = {
        fontFamily: 'Segoe UI Symbol, sans-serif',
        fontSize: '24px',
        lineHeight: '24px',
        letterSpacing: '4.8px',
        color: 'rgb(189, 233, 227)',
        textTransform: 'uppercase',
        textAlign: 'center',
    };

    return (
        // FIX 1: Changed h-screen to min-h-screen for stable flow
        <section className="w-full min-h-screen  bg-cover bg-bottom relative overflow-hidden"
        style={{
            backgroundImage: "url('https://kashiyatra.s3.eu-north-1.amazonaws.com/newBG.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',}}
        >

            <Navbar />
            
            {/* FIX 2: Moved Meteors to an absolute background layer */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <Meteors number={7} />
            </div>

            {/* FIX 3: Single content container for stable relative flow (z-10 ensures content is above meteors) */}
            <div className="relative z-10 flex justify-center items-start pt-28 sm:pt-40 lg:pt-52"> 
                
                {/* Inner content wrapper - Added pb-20 to ensure space below content */}
                <div className="flex flex-col items-center w-full max-w-7xl px-4 pb-20"> 
                    
                    {/* IIT BHU's */}
                    <div className="mb-2 sm:mb-4" style={IITBHUStyle}> 
                        IIT BHU's
                    </div>
                    
                    {/* KASHIYATRA'26 TITLE */}
                    <div className="text-center w-full max-w-[1327px] px-2 overflow-hidden">
                    <h1
                        className="inline-block text-center whitespace-nowrap leading-none"
                        style={{
                        ...kashiyatraStyle,
                        fontSize: "clamp(1.5rem, 8vw, 6rem)", 
                        lineHeight: "1.1",
                        display: "inline-block",
                        width: "100%",
                        }}>
                        KASHIYATRA'26
                    </h1>
                    </div>

                    {/* TAGLINE */}
                    <div className="mt-4 md:mt-8 w-full px-2"> 
                      <h2 
                          className="text-center text-2xl xs:text-3xl md:text-4xl lg:text-[48px] leading-snug lg:leading-[60px]" 
                          style={taglineStyle}
                      >
                          Nirvanam : Echoes of Elysian
                      </h2>
                  </div>
                    
                    {/* DATE + VENUE */}
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mt-10 md:mt-12 text-black text-lg font-medium">
                        
                        {/* DATE BLOCK */}
                        <div className="flex items-center justify-center space-x-2 w-full md:w-auto p-3 rounded-xl bg-white/30 backdrop-blur-sm border-2 border-white/60 shadow-lg">
                        <a 
                                // Google Calendar link logic
                                href="https://www.google.com/calendar/render?action=TEMPLATE&text=Kashiyatra%202026&dates=20260115T000000Z%2F20260119T000000Z&details=IIT%20BHU%20Varanasi%20Cultural%20Fest&location=IIT%20(BHU)%20Varanasi&sf=true&output=xml" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center space-x-2 w-full md:w-auto text-current no-underline"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="font-raleway">15-18 January 2026</p>
                            </a>
                        </div>

                        {/* VENUE BLOCK */}
                        <div className="flex items-center justify-center space-x-2 w-full md:w-auto p-3 rounded-xl bg-white/30 backdrop-blur-sm border-2 border-white/60 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <a href="https://www.google.com/maps?client=firefox-b-d&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=Kd18H5vvM445MUDBPWJt21V1&daddr=IIT-BHU,+Hindu+University+Campus,+Varanasi,+Uttar+Pradesh+221005" target="_blank" className="font-raleway">IIT (BHU) Varanasi</a>
                        </div>
                    </div>

                    {/* BUTTONS */}
<div className="flex flex-col items-center mt-10 md:mt-12 w-full max-w-sm md:max-w-md mx-auto px-4">
  {/* First row: Register/Profile + Explore Competitions */}
  <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 w-full justify-center">
    {isLogged ? (
      <Link 
        to="/profile" 
        className="w-auto min-w-max whitespace-nowrap text-center px-8 py-3 text-white bg-green-500 hover:bg-green-600 font-bold rounded-full transition-colors text-lg"
      >
        Go to Profile
      </Link>
    ) : (
      <button
        className="w-auto min-w-max whitespace-nowrap px-8 py-3 text-white bg-purple-600 hover:bg-purple-700 font-bold rounded-full transition-colors text-lg"
        onClick={() => navigate('/register')}
      >
        Register Now
      </button>
    )}

    <button
      className="w-auto min-w-max whitespace-nowrap px-8 py-3 text-white bg-black hover:bg-gray-800 font-medium rounded-full transition-colors text-lg"
      onClick={() => navigate('/competitions')} 
    >
      Explore Competitions
    </button>
  </div>

  {/* Second row: Zonals Registration */}
  {/* <div className="mt-4 flex justify-center w-full">
    <button
      className="w-auto min-w-max whitespace-nowrap px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 font-bold rounded-full transition-colors text-lg"
      onClick={() => navigate('/competitions/zonals')}
    >
      Zonals Registration
    </button>
  </div> */}
</div>

                    {/* DESCRIPTION */}
                    <div className="font-raleway text-white/80 text-center mt-12 text-sm md:text-lg tracking-wider w-full max-w-2xl px-4">
                        <p>
                            India's largest cultural college festival celebrating art, music, and heritage in the sacred city of Varanasi
                        </p>
                    </div>

                    {/* SCROLL INDICATOR */}
                    <div className="mt-8 text-white/70">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Landing;
