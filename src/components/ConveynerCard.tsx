import { useState } from "react";

interface ConveynerCardProps {
  image: string;
  name: string;
  title: string; // Can include \n for new lines
  link: string;
}

const ConveynerCard = ({ image, name, title, link }: ConveynerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-72 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 border border-purple-500/30 shadow-2xl transition-all duration-500 hover:shadow-purple-500/50 hover:scale-105">
        {/* Outer glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-fill transition-all duration-700 scale-100 brightness-100"
          />
        </div>

        {/* Content Section */}
        <div className="relative p-6 space-y-3">
          {/* Name */}
          <div className="flex justify-center pt-2">
            <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 group-hover:from-cyan-500 group-hover:to-purple-500 text-white text-sm font-semibold transition-all duration-300 shadow-lg group-hover:shadow-purple-500/50 transform group-hover:scale-105">
              {name}
            </div>
          </div>

          {/* Divider line */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"></div>

          {/* Title (supports \n newlines) */}
          <div className="text-center">
            <h3
              className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent whitespace-pre-line"
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
      </div>
    </a>
  );
};

export default ConveynerCard;
