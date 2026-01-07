import { useState, useEffect, useRef } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const sharedAudio = new Audio("/audio/generic.ogg");
sharedAudio.loop = true;
sharedAudio.volume = 0.7;

const AudioToggleBtn = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Only initialize once
    if (isInitialized.current) return;
    isInitialized.current = true;

    const errorHandler = (e: ErrorEvent) => {
      console.error("Error loading audio:", e);
    };
    
    sharedAudio.addEventListener("error", errorHandler);

    // Auto-play on first mount only
    sharedAudio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Error auto-playing audio:", error);
      });
      

    return () => {
      sharedAudio.removeEventListener("error", errorHandler);
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      sharedAudio.pause();
    } else {
      sharedAudio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleAudio}
      className=" border-2 border-[#D2C1A1] bg-[#D2C1A1] mix-blend-difference transition-all p-1 rounded-full text-xs lg:text-sm"
      aria-label={isPlaying ? 'Mute audio' : 'Unmute audio'}
    >
      {isPlaying ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
    </button>
  );
};

export default AudioToggleBtn;