"use client";

import { useRef, useEffect } from "react";
import VideoBackground from "./sections/VideoBackground";
import FloatingMusicPlayer, { type FloatingMusicPlayerHandle } from "./ui/FloatingMusicPlayer";

function App() {
  const playerRef = useRef<FloatingMusicPlayerHandle>(null);

  useEffect(() => {
    // Auto play music dan expand player saat component mount
    const timer = setTimeout(() => {
      playerRef.current?.playMusic();
      playerRef.current?.expand();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
      {/* Video Background - Full Screen */}
      <VideoBackground overlay overlayOpacity={0} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">{/* Konten kamu di sini */}</div>

      {/* Floating Music Player - Auto play */}
      <FloatingMusicPlayer ref={playerRef} autoPlay />
    </div>
  );
}

export default App;
