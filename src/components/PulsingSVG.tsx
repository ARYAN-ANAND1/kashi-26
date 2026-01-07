import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const PulseWave: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        
        tl.fromTo(
            svgRef.current,
            { opacity: 0, scaleY: 0.5, transformOrigin: "center bottom" },
            {
                opacity: 1,
                scaleY: 1,
                duration: 2,
                ease: "power2.inOut"
            }
        );
    }, []);

    return (
        <svg
            ref={svgRef}
            width="1440"
            height="900"
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-fix"
        >
            <mask id="mask0_2904_1274" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="2700">
                <rect width="1440" height="2700" fill="url(#paint0_linear_2904_1274)"></rect>
            </mask>
            <g mask="url(#mask0_2904_1274)">
                <path vectorEffect="non-scaling-stroke" d="M1140 1322.42V1060.26M1140..." stroke="url(#paint1_linear_2904_1274)"></path>
            </g>
            <defs>
                <linearGradient id="paint0_linear_2904_1274" x1="720" y1="0" x2="720" y2="2700" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopOpacity="0"></stop>
                    <stop offset="1"></stop>
                </linearGradient>
                <linearGradient id="paint1_linear_2904_1274" x1="300" y1="290.5" x2="1140" y2="290.5" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#CF8F7D" stopOpacity="0"></stop>
                    <stop offset="0.501116" stopColor="#CF8F7D"></stop>
                    <stop offset="1" stopColor="#CF8F7D" stopOpacity="0"></stop>
                </linearGradient>
            </defs>
        </svg>
    );
};

export default PulseWave;
