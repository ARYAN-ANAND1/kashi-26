import { useRef, useState, useEffect } from "react";
interface SpaceCardProps {
  image: string;
  title: string;
  content: string;
  showRegister?: boolean;
  registerLink?: string;
}

const ScrollCard = ({
  image,
  title,
  content,
  showRegister = false,
  registerLink = "#",
}: SpaceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const words = content.split(" ");

  useEffect(() => {
    if (isExpanded) {
      setDisplayedText("");
      setCurrentWordIndex(0);
    }
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded && currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayedText(
          (prev) => prev + (prev ? " " : "") + words[currentWordIndex]
        );
        setCurrentWordIndex((prev) => prev + 1);
      }, 1700 / words.length); // Distribute words over 1 second

      return () => clearTimeout(timer);
    }
  }, [isExpanded, currentWordIndex, words]);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="perspective-1000 group">
      <div
        ref={cardRef}
        className={`w-72 rounded-2xl bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 relative cursor-pointer font-sans shadow-2xl transition-all duration-500 border border-purple-500/30 ${
          isExpanded ? "h-auto min-h-[32rem]" : "h-80 overflow-hidden"
        }`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Title section with holographic effect */}
        <div className="relative pt-10 px-6 pb-4">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              {title}
            </h3>
          </div>
        </div>

        {/* Image section with hexagon frame */}
        <div className="relative px-6 mb-4">
          <div className="relative overflow-hidden rounded-xl border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <img
              src={image}
              alt={title}
              className="w-full h-40 object-fill transition-transform duration-500 group-hover:scale-110"
            />
            {/* Scan line effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent transition-transform duration-1000 ${
                isHovered ? "translate-y-full" : "-translate-y-full"
              }`}
            ></div>
          </div>
        </div>

        {/* Content section */}
        <div
          className={`px-6 pb-6 transition-all duration-500 ${
            isExpanded
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
            {/* Processing indicator */}
            {isExpanded && currentWordIndex < words.length && (
              <div className="flex items-center gap-2 mb-2 text-cyan-400 text-xs">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <span className="font-mono">PROCESSING...</span>
              </div>
            )}

            <p className="text-gray-200 text-sm leading-relaxed mb-4 font-mono">
              {displayedText}
              {currentWordIndex < words.length && (
                <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse"></span>
              )}
            </p>

            {showRegister && currentWordIndex >= words.length && (
              <a
                href={registerLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="block w-full text-center text-white font-semibold rounded-full py-2.5 px-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transform hover:scale-105 animate-fadeIn"
              >
                Registration
              </a>
            )}
          </div>
        </div>

        {/* Bottom glow effect */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>

        {/* Click indicator */}
        {!isExpanded && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-6 rounded-full border-2 border-cyan-400/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ScrollCard;
