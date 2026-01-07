import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

// Define the type for carousel items
interface CarouselItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

// Props interface
interface InfiniteCarouselProps {
  items: CarouselItem[];
  interval?: number; // Time in milliseconds between transitions
}

const InfiniteCarousel = ({ items, interval = 5000 }: InfiniteCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const intervalId = setInterval(() => {
      // Animate current content out
      gsap.to("#carousel-content", {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % items.length);
          // Animate new content in
          gsap.fromTo(
            "#carousel-content",
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.5,
              ease: "power2.inOut"
            }
          );
        }
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [items.length, interval]);

  return (
    <div className='flex w-full justify-center'>
        <div 
          id="carousel-content"
          className="flex flex-col items-center mt-10 w-[30rem]"
        >
          {/* Image */}
          <div className=" mb-4 overflow-hidden w-72 h-72 border border-[#D2C1A1] mx-auto">
            <img 
              src={items[currentIndex].image}
              alt={items[currentIndex].title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="text-center text-[#D2C1A1] text-2xl font-raleway">
            <h2 className="md:text-2xl text-3xl font-bold px-8 pt-8 ">
              {items[currentIndex].title}
            </h2>
            <h4 className="text-lg font-bold mb-9">{items[currentIndex].subtitle}</h4>
            <p className="leading-none mx-auto tracking-wider font-medium text-base w-2/3 md:w-[28rem]">
              {items[currentIndex].description}
            </p>
          </div>
        </div>
        </div>
  );
};

export default InfiniteCarousel;