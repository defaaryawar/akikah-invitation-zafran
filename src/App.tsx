import { useRef, useState, useEffect } from "react";
import VideoBackground from "./sections/VideoBackground";
import FloatingMusicPlayer, { type FloatingMusicPlayerHandle } from "./ui/FloatingMusicPlayer";
import SplashScreen from "./sections/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("mobile");
  const playerRef = useRef<FloatingMusicPlayerHandle>(null);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
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

  // Container styling based on screen size
  const getContainerClass = () => {
    if (screenSize === "mobile") {
      return "h-screen w-full"; // Fixed viewport height
    } else if (screenSize === "tablet") {
      return "mx-auto max-w-[635px] h-screen shadow-2xl"; // Centered, fixed height
    } else {
      return "ml-auto max-w-[575px] h-screen shadow-2xl"; // Right aligned, fixed height
    }
  };

  return (
    <div className="relative bg-black h-screen w-full overflow-hidden">
      {/* Background foto Zafran untuk tablet & desktop */}
      {screenSize !== "mobile" && (
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
          <div className="absolute inset-0 bg-black/70" />
        </div>
      )}

      {/* Container mobile viewport - Responsive */}
      <div className={`relative ${getContainerClass()}`}>
        {/* Video Background - Always rendered, INI KONTEN UTAMANYA */}
        <div className="relative h-full w-full bg-black">
          <VideoBackground
            overlay={false}
            onVideoReady={handleVideoReady}
            isMobile={screenSize === "mobile"}
          />

          {/* Splash Screen - Overlay di atas video */}
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        </div>

        {/* Floating Music Player - hanya muncul setelah splash */}
        <FloatingMusicPlayer ref={playerRef} show={!showSplash} />
      </div>
    </div>
  );
}

export default App;
