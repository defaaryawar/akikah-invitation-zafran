import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";

interface InvitationScreenProps {
  readonly isOpen: boolean;
  readonly onOpen: () => void;
}

export default function InvitationScreen({ isOpen, onOpen }: InvitationScreenProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 1.02,
    },
  };

  return (
    <AnimatePresence mode="wait">
      {!isOpen && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.6,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-10 flex items-center justify-center p-6"
        >
          {/* Background */}
          <div className="absolute inset-0">
            {!imageLoaded && <div className="absolute inset-0 bg-gray-900" />}
            <img
              src="/images/zafran.webp"
              alt="Portrait of a young boy"
              className="w-full h-full object-cover"
              loading="eager"
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/70" />
          </div>

          {/* Abstract Shapes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: imageLoaded ? 0.1 : 0, scale: imageLoaded ? 1 : 0.8 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="absolute top-12 right-20 w-72 h-72 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: imageLoaded ? 0.08 : 0, scale: imageLoaded ? 1 : 0.8 }}
            transition={{ delay: 0.7, duration: 1.4 }}
            className="absolute bottom-16 left-16 w-96 h-96 rounded-full "
          />
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: imageLoaded ? 0.05 : 0, rotate: imageLoaded ? 45 : 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="absolute top-1/4 right-1/3 w-96 h-1 bg-white blur-xl"
          />

          {/* Top Left - Nama */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: imageLoaded ? 1 : 0, x: imageLoaded ? 0 : -40 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-10 left-8"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: imageLoaded ? 1 : 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="w-12 h-px bg-white/70 mb-3"
            />
            <p className="text-white text-[12px] tracking-[0.3em] uppercase mb-2 font-medium drop-shadow-lg">
              Akikah & Syukuran
            </p>
            <h1 className="text-3xl sm:text-5xl font-serif text-white leading-tight drop-shadow-2xl">
              Zafran Sandi
            </h1>
            <h1 className="text-3xl sm:text-5xl font-serif text-white leading-tight drop-shadow-2xl">
              Kristianto
            </h1>
          </motion.div>

          {/* Bottom Right - Tanggal */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 40 }}
            animate={{
              opacity: imageLoaded ? 1 : 0,
              x: imageLoaded ? 0 : 40,
              y: imageLoaded ? 0 : 40,
            }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="absolute bottom-10 right-8"
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: imageLoaded ? 0.15 : 0, scale: imageLoaded ? 1 : 0.5 }}
                transition={{ delay: 1.1, duration: 0.9 }}
                className="absolute -top-6 -right-6 w-24 h-24 border-2 border-white/20 rounded-full"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: imageLoaded ? 0.1 : 0, scale: imageLoaded ? 1 : 0.5 }}
                transition={{ delay: 1.3, duration: 0.9 }}
                className="absolute -top-12 -right-12 w-20 h-20 border border-white/15 rounded-full"
              />

              <div className="relative rounded-xl p-4 text-right bg-black/20">
                <p className="text-white text-[10px] tracking-widest uppercase mb-1 font-medium">
                  Tanggal
                </p>
                <p className="text-white text-xl font-mono drop-shadow-lg">25 December 2025</p>
              </div>
            </div>
          </motion.div>

          {/* Center - Button & Info */}
          <div className="relative z-10 text-center max-w-sm w-full mt-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 20 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mb-6 bg-black/20  rounded-lg p-4"
            >
              <Mail className="w-4 h-4 text-white/80 mx-auto mb-2" />
              <p className="text-white/70 text-[10px] tracking-widest uppercase mb-1 font-medium">
                Kepada Yth.
              </p>
              <p className="text-white text-sm font-light drop-shadow-lg">Bapak/Ibu/Saudara/i</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 20 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={onOpen}
                className="relative overflow-hidden rounded-full bg-white/10  border border-white/20 text-white py-3 px-8 font-light tracking-wide active:bg-white/30 shadow-2xl"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-red-400 to-red-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
                  <Mail className="w-4 h-4" />
                  Buka Undangan
                </span>
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="text-white/60 text-[10px] italic mt-5 drop-shadow-md"
            >
              Mohon maaf bila ada kesalahan penulisan nama/gelar
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
