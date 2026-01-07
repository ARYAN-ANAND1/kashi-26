// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";

import { Navbar } from "@/components/Navbar";
import { Meteors } from "@/components/ui/meteors";
import { Link } from "react-router-dom";

const Hero = () => {
  // useGSAP(() => {
  //   gsap.fromTo(
  //     "path",
  //     {
  //       strokeDasharray: 1000,
  //       strokeDashoffset: 1000,
  //     },
  //     {
  //       strokeDashoffset: 0,
  //       duration: 4,
  //       ease: "power2.out",
  //       stagger: 0.3,
  //       repeat: -1,
  //     }
  //   );

  //   gsap.fromTo(
  //     "linearGradient stop",
  //     {
  //       stopOpacity: 0,
  //       y: "100%", // Move from bottom to top effect
  //     },
  //     {
  //       stopOpacity: 1,
  //       y: "0%",
  //       duration: 2,
  //       ease: "power2.inOut",
  //       stagger: {
  //         // amount: 1, // Adds a delay between stops for a wave effect
  //         from: "end" // Starts from the bottom (last stop)
  //       }
  //     }
  //   );

  //   gsap.fromTo(
  //     "path",
  //     {
  //       transformOrigin: "bottom center",
  //       // scaleY: 0, // Start from the bottom with no height
  //     },
  //     {
  //       // scaleY: 1,
  //       duration: 4,
  //       ease: "power2.out",
  //       stagger: 0.3
  //     }
  //   );
  // }, []);

  return (
    <section className="w-full h-screen bg-[url(https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535218/org_site/jkxlit0q2jdltpooyuts.svg)] bg-cover bg-bottom relative overflow-hidden">
      <Navbar />
      <div className="absolute w-full h-full">
        <div className="absolute w-full h-full flex justify-center items-center">
          <div>
            <div className=" font-uncial text-[#D2C1A1] leading-none lg:translate-x-24 px-2 lg:px-0">
              <img src="https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535217/org_site/hev60ywmfw9bvtybzztf.svg" alt="" />
              {/* <h1 className="text-[11rem] text-end -mb-8 translate-x-28">25</h1>
                <h1 className="text-[8rem]">KASHIYATRA</h1> */}
            </div>
            <div className=" font-uncial text-[#DFB384] text-center mt-6 text-4xl font-normal md:text-6xl md:font-semibold mx-auto">
              <h2>Sanskriti Pravaha</h2>
            </div>
            <div className=" font-raleway text-[#fafafa] text-center mt-6 text-lg tracking-wider mx-auto">
              <p>
                Kashiyatra, IIT Varanasi's cultural fest, blends art, music, and
                heritage in Varanasi.
              </p>
            </div>
            <div className=" flex font-raleway text-center mt-6 justify-center items-center  mx-auto">
              <Link
                to="/choose-register"
                className="px-8 py-3  text-[#430B04] bg-[#D2C1A1] hover:bg-[#DFB384] font-bold rounded-full"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full h-full overflow-hidden">
          <Meteors number={5} />

          {/* <svg
            className="is-hidden--sm-down svg-fix w-full"
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_2904_1274"
              style={{maskType: 'alpha'}}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="2700"
            >
              <rect
                width="1440"
                height="2700"
                fill="url(#paint0_linear_2904_1274)"
              ></rect>
            </mask>
            <g mask="url(#mask0_2904_1274)">
              <path
                vector-effect="non-scaling-stroke"
                d="M1140 1322.42V1060.26M1140 1060.26C1140 1210.29 1029.82 1308.32 918.654 1392.37C831.277 1458.43 720 1571.64 720 1687M1140 1060.26V798.092M1140 798.092C1140 948.13 1029.82 1046.16 918.654 1130.21C831.277 1196.27 720 1309.48 720 1424.84M1140 798.092V535.929M720 1687C720 1571.64 608.723 1458.43 521.346 1392.37C410.178 1308.32 300 1210.29 300 1060.26M720 1687V1424.84M1140 535.929C1140 685.967 1029.82 783.997 918.654 868.044C831.277 934.104 720 1047.32 720 1162.67M1140 535.929V274.326M720 1424.84C720 1309.48 608.723 1196.27 521.346 1130.21C410.178 1046.16 300 948.13 300 798.092M720 1424.84V1162.67M1140 274.326C1140 424.364 1029.82 522.394 918.654 606.441C831.277 672.501 720 785.715 720 901.071M1140 274.326V12.1631M720 1162.67C720 1047.32 608.723 934.104 521.346 868.044C410.178 783.997 300 685.967 300 535.929M720 1162.67V901.071M1140 12.1631C1140 162.201 1029.82 260.231 918.654 344.278C831.277 410.338 720 523.552 720 638.908M1140 12.1631V-250C1140 -99.9623 1029.82 -1.93189 918.654 82.1149C831.277 148.175 720 261.389 720 376.745M720 901.071C720 785.715 608.723 672.501 521.346 606.441C410.178 522.394 300 424.364 300 274.326M720 901.071V638.908M720 638.908C720 523.552 608.723 410.338 521.346 344.278C410.178 260.231 300 162.201 300 12.1631M720 638.908V376.745M720 376.745V114.582M720 376.745C720 261.389 608.723 148.175 521.346 82.1149C410.178 -1.93189 300 -99.9623 300 -250V12.1631M918.654 -180.048C831.277 -113.988 720 -0.774235 720 114.582M720 114.582C720 -0.774235 608.723 -113.988 521.346 -180.048M300 1322.42V1060.26M300 1060.26V798.092M300 798.092V535.929M300 535.929V274.326M300 274.326V12.1631"
                stroke="url(#paint1_linear_2904_1274)"
              ></path>
              <path
                vector-effect="non-scaling-stroke"
                d="M1140 1322.42V1060.26M1140 1060.26C1140 1210.29 1029.82 1308.32 918.654 1392.37C831.277 1458.43 720 1571.64 720 1687M1140 1060.26V798.092M1140 798.092C1140 948.13 1029.82 1046.16 918.654 1130.21C831.277 1196.27 720 1309.48 720 1424.84M1140 798.092V535.929M720 1687C720 1571.64 608.723 1458.43 521.346 1392.37C410.178 1308.32 300 1210.29 300 1060.26M720 1687V1424.84M1140 535.929C1140 685.967 1029.82 783.997 918.654 868.044C831.277 934.104 720 1047.32 720 1162.67M1140 535.929V274.326M720 1424.84C720 1309.48 608.723 1196.27 521.346 1130.21C410.178 1046.16 300 948.13 300 798.092M720 1424.84V1162.67M1140 274.326C1140 424.364 1029.82 522.394 918.654 606.441C831.277 672.501 720 785.715 720 901.071M1140 274.326V12.1631M720 1162.67C720 1047.32 608.723 934.104 521.346 868.044C410.178 783.997 300 685.967 300 535.929M720 1162.67V901.071M1140 12.1631C1140 162.201 1029.82 260.231 918.654 344.278C831.277 410.338 720 523.552 720 638.908M1140 12.1631V-250C1140 -99.9623 1029.82 -1.93189 918.654 82.1149C831.277 148.175 720 261.389 720 376.745M720 901.071C720 785.715 608.723 672.501 521.346 606.441C410.178 522.394 300 424.364 300 274.326M720 901.071V638.908M720 638.908C720 523.552 608.723 410.338 521.346 344.278C410.178 260.231 300 162.201 300 12.1631M720 638.908V376.745M720 376.745V114.582M720 376.745C720 261.389 608.723 148.175 521.346 82.1149C410.178 -1.93189 300 -99.9623 300 -250V12.1631M918.654 -180.048C831.277 -113.988 720 -0.774235 720 114.582M720 114.582C720 -0.774235 608.723 -113.988 521.346 -180.048M300 1322.42V1060.26M300 1060.26V798.092M300 798.092V535.929M300 535.929V274.326M300 274.326V12.1631"
                stroke="url(#paint2_linear_2904_1274)"
              ></path>
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_2904_1274"
                x1="720"
                y1="0"
                x2="720"
                y2="2700"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-opacity="0"></stop>
                <stop offset="0.0687388"></stop>
                <stop offset="0.133619" stop-opacity="0"></stop>
                <stop offset="0.194116"></stop>
                <stop offset="0.261627" stop-opacity="0"></stop>
                <stop offset="0.325631"></stop>
                <stop offset="0.390512" stop-opacity="0"></stop>
                <stop offset="0.456269"></stop>
                <stop offset="0.52115" stop-opacity="0"></stop>
                <stop offset="0.591291"></stop>
                <stop offset="0.650911" stop-opacity="0"></stop>
                <stop offset="0.720176"></stop>
                <stop offset="0.797331" stop-opacity="0"></stop>
                <stop offset="0.865719"></stop>
                <stop offset="0.934983" stop-opacity="0"></stop>
                <stop offset="1"></stop>
              </linearGradient>
              <linearGradient
                id="paint1_linear_2904_1274"
                x1="300"
                y1="290.5"
                x2="1140"
                y2="290.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#CF8F7D" stop-opacity="0"></stop>
                <stop offset="0.501116" stop-color="#CF8F7D"></stop>
                <stop offset="1" stop-color="#CF8F7D" stop-opacity="0"></stop>
              </linearGradient>
              <linearGradient
                id="paint2_linear_2904_1274"
                x1="720"
                y1="0.999983"
                x2="720"
                y2="362.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#430B04"></stop>
                <stop offset="1" stop-color="#430B04" stop-opacity="0"></stop>
              </linearGradient>
            </defs>
          </svg> */}
        </div>

        {/* <img className=" w-full h-full" src="/bg.svg" alt="" /> */}
      </div>
    </section>
  );
};

export default Hero;
