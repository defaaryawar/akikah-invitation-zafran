"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
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
  ({ autoPlay = false }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPeeking, setIsPeeking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const timeoutRef = useRef<number | null>(null);
    const hasAutoPlayedRef = useRef(false);

    const songUrl = "/songs/putro-nusontoro.mp3";
    const songTitle = "Putro Nuswantoro";
    const artistName = "Manthous";

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
      if (!autoPlay || hasAutoPlayedRef.current) return;

      hasAutoPlayedRef.current = true;
      setIsPeeking(true);

      const autoPlayTimer = setTimeout(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsExpanded(true);
            setIsPeeking(false);

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => {
              setIsExpanded(false);
              setIsPeeking(true);
            }, 4000);
          })
          .catch(() => {
            setIsPeeking(true);
            setIsPlaying(false);
          });
      }, 800);

      return () => {
        clearTimeout(autoPlayTimer);
      };
    }, [autoPlay]);

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

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = window.setTimeout(() => {
          setIsExpanded(false);
          setIsPeeking(true);
        }, 4000);
      },

      minimize() {
        setIsExpanded(false);
        setIsPeeking(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      },

      peek() {
        setIsExpanded(false);
        setIsPeeking(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      },
    }));

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
      }, 4000);
    };

    const handleClose = () => {
      setIsExpanded(false);
      setIsPeeking(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    return (
      <>
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
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative bg-black/60 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-sm"
                >
                  <button
                    onClick={handleClose}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/40 transition-all"
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

FloatingMusicPlayer.displayName = "FloatingMusicPlayer";

export default FloatingMusicPlayer;
