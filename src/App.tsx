"use client";

import { useRef, useState } from "react";
import CoverScreen from "./sections/CoverScreen";
import AkikahInvitation from "./sections/HeroCountdownSection";
import FloatingMusicPlayer, { type FloatingMusicPlayerHandle } from "./ui/FloatingMusicPlayer";

function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const playerRef = useRef<FloatingMusicPlayerHandle>(null);

  const openInvitation = () => {
    setIsCoverOpen(true);

    setTimeout(() => {
      playerRef.current?.expand();
      playerRef.current?.playMusic();
    }, 80);
  };

  return (
    <div className="relative bg-black">
      <CoverScreen isCoverOpen={isCoverOpen} openInvitation={openInvitation} />

      {isCoverOpen && (
        <>
          {/* Main Content with Snap Scroll */}
          <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
            <AkikahInvitation />
            {/* Tambah section lain di sini nanti */}
          </div>

          <FloatingMusicPlayer ref={playerRef} autoPlay={false} />
        </>
      )}
    </div>
  );
}

export default App;
