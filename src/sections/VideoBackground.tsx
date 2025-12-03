"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export default function VideoBackground({
  className = "",
  overlay = true,
  overlayOpacity = 0.3,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Preload video
    video.load();

    const handleCanPlay = () => {
      setIsLoaded(true);
      // Auto play ketika video siap
      video.play().catch((err) => {
        console.log("Auto-play was prevented:", err);
      });
    };

    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className={`absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        {/* WebM untuk Chrome/Firefox (ukuran lebih kecil) */}
        <source src="/videos/zafran-aqiqah.webm" type="video/webm" />
        {/* MP4 sebagai fallback untuk Safari/iOS */}
        <source src="/videos/zafran-aqiqah.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay gelap opsional untuk readability text */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
