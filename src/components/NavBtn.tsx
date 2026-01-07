
// import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";

interface SocialProps {
  title: string;
  smallScreenTitle?:string;
  id: string;
  link?: string;
  onClick?: () => void;
}

export function NavBtn({ title, id, link, smallScreenTitle, onClick }: SocialProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    gsap.to(overlayRef.current, {
      translateY: "0%",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleHoverOut = () => {
    gsap.to(overlayRef.current, {
      translateY: "-100%",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <a
      href={link}
      className="flex text-[#3E0F0F] hover:text-[#D2C1A1] w-full items-center relative overflow-hidden border-t border-[#3E0F0F]"
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
      onClick={onClick}
    >
      <div
        ref={overlayRef}
        className="absolute w-full h-full -translate-y-full bg-[#3E0F0F]"
      ></div>
      <div className="w-full transition-all md:py-1 mt-1 relative">
        <div className="flex justify-between">
          <div className="w-full px-2 text-xs">
            <p>{id}</p>
          </div>
          <div className="w-full text-2xl md:text-3xl font-medium">
            <p className="hidden md:block">{title}</p>
            <p className="block md:hidden">{smallScreenTitle || title}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
