"use client";

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Play, Pause, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  autoPlay?: boolean;
}

export interface FloatingMusicPlayerHandle {
  playMusic: () => void;
  pauseMusic: () => void;
  expand: () => void;
  minimize: () => void;
  peek: () => void;
}

const FloatingMusicPlayer = forwardRef<FloatingMusicPlayerHandle, MusicPlayerProps>(
  ({ }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPeeking, setIsPeeking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const timeoutRef = useRef<number | null>(null);

    // Song data
    const songUrl = "/songs/kisinan2.mp3";
    const songTitle = "Kisinan 2";
    const artistName = "Masdddho";

    // Detect mobilec:\Users\ACER\Downloads\kisinan2.mp3
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useImperativeHandle(ref, () => ({
      playMusic() {
        if (audioRef.current) {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      },

      pauseMusic() {
        if (audioRef.current) audioRef.current.pause();
        setIsPlaying(false);
      },

      expand() {
        setIsExpanded(true);
        setIsPeeking(false);
      },

      minimize() {
        setIsExpanded(false);
        setIsPeeking(true);
      },

      peek() {
        setIsExpanded(false);
        setIsPeeking(true);
      },
    }));

    // Handle play/pause sync with audio element
    useEffect(() => {
      if (!audioRef.current) return;

      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }, [isPlaying]);

    const togglePlay = () => {
      setIsPlaying((prev) => !prev);
    };

    const handleExpand = () => {
      setIsExpanded(true);
      setIsPeeking(false);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => {
        setIsExpanded(false);
        setIsPeeking(true);
      }, 3000);
    };

    const handleClose = () => {
      setIsExpanded(false);
      setIsPeeking(true);
    };

    return (
      <>
        {/* Audio element */}
        <audio ref={audioRef} loop>
          <source src={songUrl} type="audio/mpeg" />
        </audio>

        <AnimatePresence>
          {(isExpanded || isPeeking) && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{
                x: isExpanded ? 0 : 30,
                opacity: 1,
              }}
              exit={{ x: 100, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="fixed top-6 right-2 z-50"
            >
              {isExpanded ? (
                // EXPANDED VIEW
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative bg-transparent px-4 py-2.5 rounded-full shadow-2xl"
                >
                  <button
                    onClick={handleClose}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-transparent rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
                    aria-label="Close"
                  >
                    <X className="w-3 h-3 text-white" strokeWidth={3} />
                  </button>

                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        rotate: isPlaying ? 360 : 0,
                      }}
                      transition={{
                        duration: 3,
                        repeat: isPlaying ? Infinity : 0,
                        ease: "linear",
                      }}
                      className="w-10 h-10"
                    >
                      <img src="/images/spotify.svg" alt="Spotify" className="w-full h-full" />
                    </motion.div>

                    <div className="min-w-0 max-w-[140px]">
                      <p className="text-xs font-semibold truncate text-white">{songTitle}</p>
                      <p className="text-[10px] text-white/80 truncate">{artistName}</p>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={isMobile ? {} : { scale: 1.1 }}
                      onClick={togglePlay}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <AnimatePresence mode="wait">
                        {isPlaying ? (
                          <motion.div
                            key="pause"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Pause className="w-4 h-4 text-white" fill="currentColor" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="play"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                // PEEK VIEW
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={isMobile ? {} : { scale: 1.15, x: -3 }}
                  onClick={handleExpand}
                  className="cursor-pointer"
                >
                  <motion.div
                    animate={{
                      rotate: isPlaying ? 360 : 0,
                    }}
                    transition={{
                      duration: 3,
                      repeat: isPlaying ? Infinity : 0,
                      ease: "linear",
                    }}
                    className="w-12 h-12"
                  >
                    <img
                      src="/images/spotify.svg"
                      alt="Spotify"
                      className="w-full h-full drop-shadow-2xl"
                    />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

export default FloatingMusicPlayer;
