import { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import YourPage from "./Dummy";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const containerRef = useRef(null);
  const leftCircleRef = useRef(null);
  const rightCircleRef = useRef(null);
  const [mobilestrip, setMobilestrip] = useState(false)
  const middleRef = useRef(null);
  const [strip, setstrip] = useState(true);
  const [centercircle, setcentercircle] = useState(false);
  const [circle, setcircle] = useState(true);
  

  let progress;
  useGSAP(() => {
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom bottom",
        scrub: 0.3, // Adjust scrub for smoothness
        invalidateOnRefresh: true, // Ensures correct recalculation
        onUpdate: (self) => {
          progress = self.progress; // Scroll progress from 0 to 1
          if(progress<=0.4476){
           setMobilestrip(false);
          } else {
           setMobilestrip(true);
          }
          if (progress >= 0.29) {
            setstrip(true);
            setcentercircle(false);
            setcircle(true);
          } else {
            setstrip(false);
            setcentercircle(true);
            setcircle(false);
          }
        },
      },
    }
  );

    tl.to(middleRef.current, {
      width: "80vw",
      ease: "power2.inOut",
    });

    // Left circle rotation
    gsap.set(leftCircleRef.current, {
      top: "50%",
      xPercent: -50,
      yPercent: -50
    });
    gsap.to(leftCircleRef.current, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    // Right circle rotation (opposite direction)
    if(window.innerWidth<780 ){

      gsap.set(rightCircleRef.current, {
        top: "50%", 
        xPercent: -35,
        yPercent: -50
      });
    }
    else{
      gsap.set(rightCircleRef.current, {
        top: "50%", 
        xPercent: -50,
        yPercent: -50
      });
    }
    gsap.to(rightCircleRef.current, {
      rotation: -360,
      duration: 8,
      repeat: -1,
      ease: "none"
    });
  }, []); // Pass an empty array

  return (
    <>
      <div
        ref={containerRef}
        className="flex min-h-screen md:h-screen w-full bg-[url(/blueBG.webp)] bg-cover overflow-hidden"
      >
        <div className="w-1/2 flex justify-end">
          <img  src="https://kashiyatra.s3.eu-north-1.amazonaws.com/leftCircle.svg" alt="Left Circle" />
        </div>
        <div ref={middleRef} className="w-0 relative flex justify-between ">
          <div id="left-content">
            <img

            ref={leftCircleRef}

              className={`absolute z-10 scale-75 md:scale-100  ${

                circle ? "w-52" : "w-0"
              }`}
              src="https://kashiyatra.s3.eu-north-1.amazonaws.com/midCircle.svg"
              alt=""
            />
            <img
              src="/leftStrip.svg"
              className={`transition-all duration-150 ${
                strip ? "opacity-100" : "opacity-0"
              } md:block ${mobilestrip ? "block" : "hidden"}`}
              alt=""
            />
          </div>
          <div id="mid-content" className="w-full h-full overflow-hidden">
            <div className="flex justify-center md:mb-16">
              <h1 
                className="font-normal pt-16 md:pt-8 text-center
                  text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                  leading-tight sm:leading-snug md:leading-normal
                  bg-gradient-to-r from-[#FFD966] via-[#C285E0] to-[#7D8FE8]
                  bg-clip-text 
                  text-transparent
                  font-[Urbanist,sans-serif]
                "
              >
                Testimonials
              </h1>
            </div>
            {/* <div id="testimonial-container" className="w-full h-full pt-16 bg-red-300">
              <div id="img-container" className="w-72 h-72 border border-[#D2C1A1] bg-blue-300 mx-auto">
                <img src="" alt="" />
              </div>
              <div id="content-container" className="w-full h-full">
                <div className="text-center text-[#D2C1A1] text-2xl pt-4 font-raleway">
                  <h1 className=" font-extrabold">Sidhu Moose Wala</h1>
                  <h4 className="text-lg font-bold">Lyrical God</h4>
                  <p className="w-2/3 mx-auto leading-none font-medium pt-9 text-base">“Kashiyatra was a laughter filled rendezvous that i wont soon forget Thank you all for turning an evening of comedy into a heartwarming connection"</p>
                </div>

              </div>

            </div> */}
            <YourPage/>
          </div>
          <img
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${
              centercircle ? "min-w-52" : "w-0"
            }`}
            src="https://kashiyatra.s3.eu-north-1.amazonaws.com/midCircle.svg"
            alt=""
          />
          <div id="right-content">
            <img

            ref={rightCircleRef}

              className={`absolute traslatex-5  sm: translate-x-1 md:translate-x-10 scale-75 md:scale-100 ${

                circle ? "w-52" : "w-0"
              }`}
              src="https://kashiyatra.s3.eu-north-1.amazonaws.com/midCircle.svg"
              alt=""
            />
            <img
              src="https://kashiyatra.s3.eu-north-1.amazonaws.com/rightStrip.svg"
              className={`transition-all duration-150 ${
                strip ? "opacity-100" : "opacity-0"
              } md:block ${mobilestrip ? "block" : "hidden"}`}
              alt=""
            />
          </div>
        </div>
        <div className="w-1/2 flex justify-start">
          <img src="https://kashiyatra.s3.eu-north-1.amazonaws.com/rightCircle.svg" alt="Right Circle" />
        </div>
        {/* <LoginForm/> */}
      </div>
    </>
  );
};

export default Testimonials;
