import React from "react";
type NumberTickerProps = {
  value: number;
  className: string;
  style: React.CSSProperties;
};
// --- FIX:- Self-contained NumberTicker component ---
// This is a simplified static version of the NumberTicker component
// to resolve the import error and ensure the code compiles in a file.
const NumberTicker = ({ value, className, style }:NumberTickerProps) => {
  // In a full implementation, this component would handle counting animation.
  // For stability in this environment, we just display the final value.
  return (
    <span className={className} style={style}>
      {value}
    </span>
  );
};
// ----------------------------------------------------


const About = () => {
  // 1. Define the common gradients and styles for reuse
  const numberGradientStyle = {
    // ... (unchanged)
    backgroundImage: "linear-gradient(90deg, #FFD966 0%, #C285E0 50%, #7D8FE8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
  };

  const iconCircleGradient = {
    // ... (unchanged)
    background: "linear-gradient(180deg, rgba(128, 51, 204, 0.1) 0%, rgba(60, 87, 221, 0.05) 50%, rgba(128, 51, 204, 0.1) 100%)",
    border: "1px solid rgba(128, 51, 204, 0.4)",
  };

  const iconColor = "rgba(194, 133, 224, 1)"; // The vibrant purple for the icon outlines

  // Helper component to create a styled placeholder icon matching the image's aesthetic
  // In a real project, you would replace this with a proper SVG/Icon component
  const StyledIconPlaceholder = ({ children }: { children: React.ReactNode }) => (
    <div
      className="text-4xl"
      style={{ color: iconColor }}
    >
      {children}
    </div>
  );


  return (
    <div className="bg-[#100318] min-h-screen text-white pt-16 pb-20">
      <div>
        {/* About Kashiyatra Title (Omitted for brevity) */}
        <div className="text-center text-6xl font-extrabold mx-auto pt-16">
          <h2
            className="inline-block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(93.83deg, #FFD966 0%, #C285E0 50%, #7D8FE8 100%)",
              fontFamily: 'Urbanist, sans-serif',
              fontSize: '60px',
            }}
          >
            About Kashiyatra
          </h2>
        </div>

        {/* Main Paragraph Text (Omitted for brevity) */}
        <div className="font-sans text-white text-center mt-6 text-lg tracking-wider w-4/5 lg:w-3/5 mx-auto px-4" style={{ fontFamily: "'Iceberg', sans-serif" }}>
          <p>
            Kashiyatra, the vibrant socio-cultural fest of IIT(BHU) Varanasi, is a grand three-day celebration of literature, music, and art. Renowned as northern India's premier cultural event, it takes place in IIT(BHU), located within Asia's largest residential university, BHU, in the sacred city of Varanasi.
          </p>
          <p className="mt-4">
            Known for its timeless traditions and rich heritage, Varanasi perfectly complements the century-old legacy of IIT(BHU) in fostering technical and cultural excellence. Each year, Kashiyatra brings together thousands of students, artists, and cultural enthusiasts to celebrate creativity, talent, and the spirit of unity.
          </p>
        </div>

        {/* Quote Box (Omitted for brevity) */}
        {/* Quote Box (Responsive + No Overflow) */}
        <div
          className="w-4/5 md:w-[896px] mx-auto p-6 sm:p-10 mt-16 rounded-2xl flex items-center justify-center text-center"
          style={{
            backgroundColor: "rgba(19, 19, 22, 0.5)",
            border: "1px solid rgba(128, 51, 204, 0.2)",
            borderRadius: "16px",
            boxShadow: "0px 20px 60px 0px rgba(51, 20, 82, 0.6)",
            backdropFilter: "blur(4px)",
            // 🟩 removed fixed height so it expands as needed
          }}
        >
          <p
            className="
      font-normal tracking-normal break-words
      text-[18px] sm:text-[24px] md:text-[28px]
      leading-[22px] sm:leading-[30px] md:leading-[36px]
      px-2
    "
            style={{
              fontFamily: "Urbanist, sans-serif",
              backgroundImage:
                "linear-gradient(90deg, rgb(255, 217, 102) 0%, rgb(194, 133, 224) 50%, rgb(125, 143, 232) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              wordWrap: "break-word",
              whiteSpace: "normal", // 🟩 ensures text wraps
            }}
          >
            "Where tradition meets transcendence, and music becomes meditation"
          </p>
        </div>


        {/* 2. STATS SECTION WRAPPER */}
        <div
          className="max-w-7xl mx-auto w-full px-4 lg:px-0 mt-28 flex flex-wrap justify-around items-start text-center"
          style={{ minHeight: "358px" }}
        >

          {/* STAT 1: 700+ COLLEGES */}
          <div className="flex flex-col items-center w-1/2 sm:w-1/4 p-4">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={iconCircleGradient}>
              {/* College Icon Placeholder (Using a generic outline-style element for simplicity) */}
              <StyledIconPlaceholder>
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap">
                  <path d="M21.42 10.922a1 1 0 0 0-.01-1.843L12.7 5.263a2 2 0 0 0-1.4 0L2.59 9.079a1 1 0 0 0-.01 1.843l8.72 3.819a2 2 0 0 0 1.4 0z" /><path d="M12 22a2 2 0 0 0 1-1.782v-3.834" />
                </svg>
              </StyledIconPlaceholder>
            </div>

            <span className="flex justify-center items-baseline">
              <NumberTicker
                value={700}
                className="whitespace-pre-wrap text-4xl font-extrabold" // text-4xl (fixed size)
                style={numberGradientStyle}
              />
              <p className="text-3xl font-extrabold" style={numberGradientStyle}>+</p> {/* text-3xl (fixed size) */}
            </span>

            <span className="mt-2 text-sm uppercase tracking-widest text-white/80">
              Colleges
            </span>
          </div>

          {/* STAT 2: ₹2M+ PRIZE POOL */}
          <div className="flex flex-col items-center w-1/2 sm:w-1/4 p-4">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={iconCircleGradient}>
              {/* Trophy Icon Placeholder */}
              <StyledIconPlaceholder>
                {/* Replace with your actual SVG component/element */}
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trophy-icon lucide-trophy">
                <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/><path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/><path d="M18 9h1.5a1 1 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/><path d="M6 9H4.5a1 1 0 0 1 0-5H6"/></svg>
              </StyledIconPlaceholder>
            </div>

            <span className="flex justify-center items-baseline">
              <p className="text-3xl font-extrabold mr-1" style={numberGradientStyle}>₹</p> {/* text-3xl (fixed size) */}
              <NumberTicker
                value={2}
                className="whitespace-pre-wrap text-4xl font-extrabold" // text-4xl (fixed size)
                style={numberGradientStyle}
              />
              <p className="text-3xl font-extrabold" style={numberGradientStyle}>M+</p> {/* text-3xl (fixed size) */}
            </span>

            <span className="mt-2 text-sm uppercase tracking-widest text-white/80">
              Prize Pool
            </span>
          </div>

          {/* STAT 3: 60+ EVENTS */}
          <div className="flex flex-col items-center w-1/2 sm:w-1/4 p-4">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={iconCircleGradient}>
              {/* Calendar Icon Placeholder */}
              <StyledIconPlaceholder>
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-fold-icon lucide-calendar-fold">
              <path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z"/><path d="M3 10h18"/><path d="M15 22v-4a2 2 0 0 1 2-2h4"/></svg>
              </StyledIconPlaceholder>
            </div>

            <span className="flex justify-center items-baseline">
              <NumberTicker
                value={60}
                className="whitespace-pre-wrap text-4xl font-extrabold" // text-4xl (fixed size)
                style={numberGradientStyle}
              />
              <p className="text-3xl font-extrabold" style={numberGradientStyle}>+</p> {/* text-3xl (fixed size) */}
            </span>

            <span className="mt-2 text-sm uppercase tracking-widest text-white/80">
              Events
            </span>
          </div>

          {/* STAT 4 (Keeping the original emoji structure just in case) */}
          <div className="flex flex-col items-center w-1/2 sm:w-1/4 p-4">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={iconCircleGradient}>
               {/* <div className="text-4xl" style={{ color: iconColor }}>
                👥 {/* Placeholder for Footfall/Users 
              </div> */}
              <StyledIconPlaceholder>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users-icon lucide-users">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
              </StyledIconPlaceholder>
            </div>

            <span className="flex justify-center items-baseline">
              <NumberTicker
                value={80}
                className="whitespace-pre-wrap text-4xl font-extrabold" // text-4xl (fixed size)
                style={numberGradientStyle}
              />
              <p className="text-3xl font-extrabold" style={numberGradientStyle}>K+</p> {/* text-3xl (fixed size) */}
            </span>

            <span className="mt-2 text-sm uppercase tracking-widest text-white/80">
              Footfall
            </span>
          </div>
        </div>
        {/* End of Stats Section Wrapper */}
      </div>
    </div>
  );
};

export default About;
