import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BrandingScreenProps {
  onComplete: () => void;
}

export function BrandingScreen({ onComplete }: BrandingScreenProps) {
  const [splitCurtain, setSplitCurtain] = useState(false);

  useEffect(() => {
    const brandingTimer = setTimeout(() => {
      setSplitCurtain(true);
    }, 2500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(brandingTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {/* Top Half - Moves Up */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: splitCurtain ? "-100%" : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-black flex items-end justify-center pb-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: splitCurtain ? 0 : 1,
            y: splitCurtain ? -40 : 0,
          }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-32 h-px bg-white/20 mx-auto mb-4"
          />

          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl font-serif text-white tracking-[0.2em] relative"
            style={{
              textShadow: "0 0 40px rgba(255,255,255,0.1)",
              letterSpacing: "0.25em",
            }}
          >
            DS
          </motion.h1>
        </motion.div>
      </motion.div>

      {/* Bottom Half - Moves Down */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: splitCurtain ? "100%" : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-black flex items-start justify-center pt-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: splitCurtain ? 0 : 1,
            y: splitCurtain ? 40 : 0,
          }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-md text-white/60 uppercase tracking-[0.5em] mb-4"
            style={{
              textShadow: "0 0 20px rgba(255,255,255,0.05)",
            }}
          >
            def studio
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-32 h-px bg-white/20 mx-auto"
          />
        </motion.div>
      </motion.div>

      {/* Center divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: splitCurtain ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-px bg-white/30"
        style={{
          boxShadow: "0 0 20px rgba(255,255,255,0.2)",
        }}
      />

      {/* Corner accents */}
      {[
        "top-8 left-8 border-t border-l",
        "top-8 right-8 border-t border-r",
        "bottom-8 left-8 border-b border-l",
        "bottom-8 right-8 border-b border-r"
      ].map((position, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: splitCurtain ? 0 : 0.3 }}
          transition={{ duration: 0.8, delay: 1 }}
          className={`absolute ${position} w-16 h-16 border-white/10`}
        />
      ))}
    </div>
  );
}