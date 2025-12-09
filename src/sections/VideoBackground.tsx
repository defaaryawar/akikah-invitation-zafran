"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  onVideoReady?: () => void;
  isMobile?: boolean;
}

export default function VideoBackground({
  className = "",
  overlay = true,
  overlayOpacity = 0.3,
  onVideoReady,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();

    const handleCanPlay = () => {
      setIsLoaded(true);
      video.play().catch(() => {});

      if (onVideoReady) {
        setTimeout(() => {
          onVideoReady();
        }, 500);
      }
    };

    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [onVideoReady]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Video dengan styling inline untuk responsif sempurna */}
      <video
        ref={videoRef}
        className={`w-full h-full transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          objectFit: "cover", // Selalu cover container, ga peduli zoom
          objectPosition: "center", // Posisi tengah
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/zafran-aqiqah.webm" type="video/webm" />
        <source src="/videos/zafran-aqiqah.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {overlay && (
        <div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {!isLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
