"use client";

import { useRef } from "react";
import VideoBackground from "./sections/VideoBackground";
import FloatingMusicPlayer, { type FloatingMusicPlayerHandle } from "./ui/FloatingMusicPlayer";

function App() {
  const playerRef = useRef<FloatingMusicPlayerHandle>(null);

  const handleVideoReady = () => {
    playerRef.current?.playMusic();
    playerRef.current?.expand();
  };

  return (
    <div className="relative bg-black min-h-screen">
      <VideoBackground overlay={false} onVideoReady={handleVideoReady} />

      <div className="relative z-10 min-h-screen"></div>

      <FloatingMusicPlayer ref={playerRef} />
    </div>
  );
}

export default App;
