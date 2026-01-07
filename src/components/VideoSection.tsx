import React, { CSSProperties } from "react";

const VideoSection: React.FC = () => {
const videoSource = "https://kashiyatra.s3.eu-north-1.amazonaws.com/video_KY.mov";
const headingStyle: CSSProperties = {
    fontFamily: "Urbanist, sans-serif",
    fontWeight: 400,
    fontSize: "48px",
    lineHeight: "56px",
    backgroundImage:
    "linear-gradient(93.83deg,rgb(224, 175, 29) 0%, #C285E0 70%, #7D8FE8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
};

return (
    <div className="w-full py-16 bg-[#100318]">
    <div className="max-w-8xl mx-auto px-4">
        <h2 className="font-normal text-center mb-10" style={headingStyle}>
        Kashiyatra'25 Glimpse
        </h2>
        <div className="w-full rounded-3xl overflow-hidden shadow-2xl">
        <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto object-cover"
        >
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        </div>
    </div>
    </div>
);
};

export default VideoSection;
