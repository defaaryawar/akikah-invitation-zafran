import { useRef, useState, useEffect } from "react";
import VideoBackground from "./sections/VideoBackground";
import FloatingMusicPlayer, { type FloatingMusicPlayerHandle } from "./ui/FloatingMusicPlayer";
import SplashScreen from "./sections/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const playerRef = useRef<FloatingMusicPlayerHandle>(null);

  // Detect mobile or desktop
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleVideoReady = () => {
    if (!showSplash) {
      playerRef.current?.playMusic();
      playerRef.current?.expand();
    }
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Trigger music setelah splash selesai
    setTimeout(() => {
      playerRef.current?.playMusic();
      playerRef.current?.expand();
    }, 300);
  };

  return (
    <div className="relative bg-black/80 min-h-screen overflow-hidden">
      {/* Background foto Zafran untuk desktop */}
      {!isMobile && (
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: "url(/images/zafran.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay gelap biar ga terlalu terang */}
          <div className="absolute inset-0 bg-black/80" />
        </div>
      )}

      <div
        className={`relative ${
          !isMobile ? "ml-auto max-w-[470px] min-h-screen shadow-2xl" : "min-h-screen"
        }`}
      >
        <div className="relative min-h-screen bg-black">
          <VideoBackground overlay={false} onVideoReady={handleVideoReady} />

          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        </div>

        {/* Floating Music Player - hanya muncul setelah splash */}
        <FloatingMusicPlayer ref={playerRef} show={!showSplash} />
      </div>
    </div>
  );
}

export default App;
