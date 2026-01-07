// import { useState, useEffect } from "react";

// // ... existing code ...
// const BackgroundMusic = () => {
//   const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     const newAudio = new Audio("/audio/generic.ogg");
//     newAudio.loop = true;
//     newAudio.volume = 0.5;

//     // Handle audio loading errors
//     newAudio.addEventListener("error", (e) => {
//       console.error("Error loading audio:", e);
//     });

//     setAudio(newAudio);

//     // Auto-play on component mount
//     newAudio
//       .play()
//       .then(() => {
//         setIsPlaying(true);
//       })
//       .catch((error) => {
//         console.error("Error auto-playing audio:", error);
//       });

//     return () => {
//       if (newAudio) {
//         newAudio.pause();
//         newAudio.currentTime = 0;
//       }
//     };
//   }, []);

//   // const handleMusicToggle = async () => {
//   //   if (audio) {
//   //     try {
//   //       if (isPlaying) {
//   //         audio.pause();
//   //         setIsPlaying(false);
//   //       } else {
//   //         await audio.play();
//   //         setIsPlaying(true);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error playing audio:", error);
//   //     }
//   //   }
//   };

//   return (
//     <>
//       {/* <button
//         onClick={handleMusicToggle}
//         style={{
//           padding: "8px 16px",
//           borderRadius: "4px",
//           cursor: "pointer",
//           backgroundColor: isPlaying ? "#ff4444" : "#44ff44",
//           border: "none",
//           color: "white",
//         }}
//       >
//         {isPlaying ? "Pause Music" : "Start Music"}
//       </button> */}
//     </>
//   );
// };
// // ... existing code ...

// export default BackgroundMusic;
