import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";




export const DragCards = () => {
  return (
    <section 
    className="relative grid min-h-screen bg-no-repeat bg-cover w-full text-center overflow-hidden bg-[url(https://kashiyatra.s3.eu-north-1.amazonaws.com/throwbackBg.webp)]"
      style={{
        background: "linear-gradient(180deg, #100318C0 0%, #310D3DA0 15%, #6A3E92A0 35%, #310D3DA0 70%, #100318C0 100%), url(https://kashiyatra.s3.eu-north-1.amazonaws.com/throwbackBg.webp)",
      }}
    >
      <h1 
        className="font-normal mx-auto pt-16"
        style={{
          // Font and Layout Styles
          fontFamily: 'Urbanist, sans-serif',
          fontWeight: 400,
          
          // Gradient and Clipping Styles
          backgroundImage: 'linear-gradient(94.47deg, #FFD966 0%, #C285E0 50%, #7D8FE8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[60px] leading-none">
          Throwbacks
        </span>
      </h1>
      {/* <ParticlesComponent/> */}
      <Cards />
      <h1 className="text-[#D2C1A1]/50 absolute bottom-3 left-1/2 -translate-x-1/2 text-xl font-medium pt-16 font-raleway">Drag to play!</h1>
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src="https://kashiyatra.s3.eu-north-1.amazonaws.com/t1.jpg"
        alt="Example image"
        rotate="6deg"
        top="20%"
        left="25%"
        className="w-36 md:w-56"
      />
      <Card
        containerRef={containerRef}
        src="https://kashiyatra.s3.eu-north-1.amazonaws.com/t2.webp"
        alt="Example image"
        rotate="12deg"
        top="65%"
        left="50%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src="https://kashiyatra.s3.eu-north-1.amazonaws.com/t3.webp"
        alt="Example image"
        rotate="-6deg"
        top="20%"
        left="40%"
        className="w-52 md:w-80"
      />
      <Card
        containerRef={containerRef}
        src="https://kashiyatra.s3.eu-north-1.amazonaws.com/t4.webp"
        alt="Example image"
        rotate="15deg"
        top="40%"
        left="30%"
        className="w-48 md:w-72"
      />
      <Card
        containerRef={containerRef}
        src="https://kashiyatra.s3.eu-north-1.amazonaws.com/t5.webp"
        alt="Example image"
        rotate="18deg"
        top="20%"
        left="65%"
        className="w-40 md:w-64"
      />
      <Card
        containerRef={containerRef}
        src="https://kashiyatra.s3.eu-north-1.amazonaws.com/t6.webp"
        alt="Example image"
        rotate="-3deg"
        top="35%"
        left="55%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src="https://kashiyatra.s3.eu-north-1.amazonaws.com/t7.webp"
        alt="Example image"
        rotate="-3deg"
        top="40%"
        left="20%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src="https://kashiyatra.s3.eu-north-1.amazonaws.com/t8.webp"
        alt="Example image"
        rotate="8deg"
        top="75%"
        left="60%"
        className="w-24 md:w-48"
      />
    </div>
  );
};
interface CardProps {
  containerRef: React.RefObject<HTMLDivElement>;
  src: string;
  alt: string;
  top: string;
  left: string;
  rotate: string;
  className: string;
}

const Card = ({ containerRef, src, alt, top, left, rotate, className }: CardProps) => {
  const [zIndex, setZIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo(
      ".drag-elements",
      {
        x: (index) => (index % 2 === 0 ? -window.innerWidth : window.innerWidth),
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: {
          amount: 0.8,
          from: "random"
        },
        scrollTrigger: {
          trigger: ".drag-elements",
          start: "top center",
          end: "bottom center", 
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute w-48 rounded-xl bg-gradient-to-r from-[#FFD966] via-[#C285E0] to-[#7D8FE8] p-1",
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
      //   dragMomentum={false}
      dragElastic={0.65}
    />
  );
};
