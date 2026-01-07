import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// --- COMPONENT LOGIC ---

interface CardProps {
  imageUrl: string;
  clockwise: boolean; // This prop is now unused
  rotDeg?: number;    
  link: string;
}

// Set a max rotation angle for the tilt effect
const MAX_ROTATION = 15; // degrees

const Card: React.FC<CardProps> = ({ imageUrl, link }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) {
      return;
    }

    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    // Calculate mouse position relative to the card's center
    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;

    // Normalize from -1 to 1
    const normX = x / (width / 2);
    const normY = y / (height / 2);

    // Calculate rotation
    const rotateY = normX * -MAX_ROTATION;
    const rotateX = normY * MAX_ROTATION;

    // Calculate mouse position for the shine (relative to top-left)
    const mouseX = clientX - left;
    const mouseY = clientY - top;

    // Set CSS custom properties
    requestAnimationFrame(() => {
        if (cardRef.current) {
            cardRef.current.style.setProperty('--rotate-x', `${rotateX}deg`);
            cardRef.current.style.setProperty('--rotate-y', `${rotateY}deg`);
            cardRef.current.style.setProperty('--mouse-x', `${mouseX}px`);
            cardRef.current.style.setProperty('--mouse-y', `${mouseY}px`);
            cardRef.current.style.setProperty('--tilt-transition', 'transform 0.05s linear');
            cardRef.current.style.setProperty('--shine-transition', 'opacity 0.05s linear');
        }
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) {
      return;
    }

    // Reset all values on mouse leave
    requestAnimationFrame(() => {
        if (cardRef.current) {
            cardRef.current.style.setProperty('--rotate-x', '0deg');
            cardRef.current.style.setProperty('--rotate-y', '0deg');
            cardRef.current.style.setProperty('--tilt-transition', 'transform 0.3s ease-out');
            cardRef.current.style.setProperty('--shine-transition', 'opacity 0.3s ease-out');
        }
    });
    setIsHovered(false); // Reset scale
  };

  const handleMouseEnter = () => {
    setIsHovered(true); // Trigger scale
  };

  return (
    <>
      {/* --- INLINE STYLES --- */}
      <style>{`
        .parallax-card {
          /* Define default values for our variables */
          --rotate-x: 0deg;
          --rotate-y: 0deg;
          --mouse-x: -100px; /* Start shine off-screen */
          --mouse-y: -100px;
          --tilt-transition: transform 0.3s ease-out;
          --shine-transition: opacity 0.3s ease-out;

          /* Sizing from your component */
          width: 250px;
          height: 400px;
          
          /* 3D setup */
          perspective: 1000px;
          transform-style: preserve-3d;
          
          /* Style for the card wrapper */
          border-radius: 12px;
          position: relative;
          overflow: hidden;

          /* Apply the combined transform for tilt and scale */
          transform: 
            rotateX(var(--rotate-x)) 
            rotateY(var(--rotate-y)) 
            scale(var(--card-scale, 1)); /* Default scale is 1 */
          
          transition: var(--tilt-transition), transform 0.3s ease-out; /* Transition for tilt and scale */
        }

        /* Scale on hover */
        .parallax-card.is-hovered {
            --card-scale: 1.1; /* Scale up when hovered */
        }

        .parallax-card-inner {
          /* This div holds the gradient border and the image */
          width: 100%;
          height: 100%;
          
          /* Lifts the content forward in the 3D space, which includes the border */
          transform: translateZ(30px); 
          transform-style: preserve-3d;
          
          /* Apply your gradient border classes directly here */
          /* Tailwind classes will be processed by your build system */
        }

        .parallax-card-shine {
          position: absolute;
          top: var(--mouse-y);
          left: var(--mouse-x);
          width: 300px; 
          height: 300px;
          transform: translate(-50%, -50%); 
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: var(--shine-transition);
          pointer-events: none; /* Make sure it doesn't block mouse events */
        }

        /* Show the shine on hover */
        .parallax-card:hover .parallax-card-shine {
          opacity: 1;
        }
      `}</style>

      {/* --- JSX STRUCTURE --- */}
      <Link to={`/competitions/${link}`}>
        <div
          ref={cardRef}
          className={`parallax-card ${isHovered ? 'is-hovered' : ''} p-[5px] rounded-xl bg-gradient-to-r from-[#FFD966] via-[#C285E0] to-[#7D8FE8]`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter} // Added for scale effect
        >
          {/* Gradient Border Wrapper - this is the "content" that gets lifted */}
          <div className="parallax-card-inner p-[3px] rounded-xl  bg-gradient-to-r from-[#FFD966] via-[#C285E0] to-[#7D8FE8]">
            {/* Inner Card (Image Container) */}
            <div className="relative rounded-xl overflow-hidden bg-[#430B04] w-full h-full">
              <img
                className="w-full h-full object-cover select-none"
                src={imageUrl}
                alt=""
              />
            </div>
          </div>
          {/* Shine element */}
          <div className="parallax-card-shine" />
        </div>
      </Link>
    </>
  );
};

export default Card;
