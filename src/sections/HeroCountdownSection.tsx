import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function AkikahInvitation() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <HeroSection />
      <CountdownSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="h-screen flex items-center justify-center overflow-hidden snap-start snap-always">
      <div className="absolute inset-0">
        <img
          src="/images/zafran-closeup.webp"
          alt="Zafran"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-24 h-px bg-white/50 mx-auto mb-6"
          />

          <h2 className="text-white/80 text-sm tracking-[0.3em] uppercase mb-4 font-light">
            Dengan Penuh Syukur
          </h2>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-2xl">
            Zafran Sandi
          </h1>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif text-white mb-8 leading-tight drop-shadow-2xl">
            Kristianto
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-24 h-px bg-white/50 mx-auto mb-1"
          />

          <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara Akikah & Syukuran putra kami
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-white/50 text-xs tracking-widest uppercase">Scroll</p>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-white/50 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CountdownSection() {
  const targetDate = new Date("2025-12-25T10:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showCountdown, setShowCountdown] = useState(true);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex items-start justify-center bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 snap-start snap-always px-4 pt-0 pb-0 md:px-6 md:pt-8">
      <motion.div
        layout
        transition={{ duration: 0.6, ease: "easeInOut" }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative w-full max-w-4xl md:max-w-5xl"
      >
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-gray-900/70 to-black/70 rounded-t-2xl" />

        <div className="relative p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-4 md:mb-6"
          >
            <div className="w-12 h-px bg-white/30 mx-auto mb-3" />
            <h2 className="text-white/60 text-xs tracking-[0.3em] uppercase mb-1">Hitung Mundur</h2>
            <h3 className="text-2xl md:text-4xl font-serif text-white">Menuju Hari Bahagia</h3>
          </motion.div>

          <AnimatePresence mode="wait">
            {showCountdown ? (
              <motion.div
                key="countdown"
                initial={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="space-y-10"
              >
                <div className="mt-6 md:mt-10 grid grid-cols-4 gap-3 md:gap-8 mb-10">
                  {[
                    { label: "Hari", value: timeLeft.days },
                    { label: "Jam", value: timeLeft.hours },
                    { label: "Menit", value: timeLeft.minutes },
                    { label: "Detik", value: timeLeft.seconds },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-3 md:p-6">
                        <div className="text-center">
                          <motion.div
                            key={item.value}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-3xl md:text-6xl font-bold text-white mb-1 font-mono"
                          >
                            {String(item.value).padStart(2, "0")}
                          </motion.div>
                          <div className="text-white/50 text-xs md:text-sm uppercase tracking-wider">
                            {item.label}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
                >
                  {[
                    { icon: Calendar, label: "Tanggal", value: "25 Desember 2025" },
                    { icon: Clock, label: "Waktu", value: "10:00 WIB" },
                    { icon: MapPin, label: "Lokasi", value: "Tangerang, Banten" },
                  ].map((detail) => (
                    <div
                      key={detail.label}
                      className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 md:p-4"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center">
                        <detail.icon className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs md:text-xs uppercase tracking-wider">
                          {detail.label}
                        </p>
                        <p className="text-white text-sm md:text-base font-light">{detail.value}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCountdown(false)}
                    className="w-full px-6 py-3 bg-white/10 rounded-lg text-white text-sm uppercase tracking-wider md:hover:bg-white/20 transition-colors"
                  >
                    Lihat Full Lokasi
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="location"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="w-full h-px bg-white/20"></div>
                {/* Address Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="max-w-xl mx-auto text-center px-4 pt-6"
                >
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    Alamat lengkap:
                    <br />
                    <span className="text-white/90">
                      Jl. Elang II No.19A 004, RW.01, Sawah Lama, Ciputat, South Tangerang City,
                      Banten 15413
                    </span>
                  </p>
                </motion.div>

                {/* Maps Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="max-w-4xl mx-auto pt-6"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3965.7215310424717!2d106.73127657200844!3d-6.300274647688452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTgnMDEuMCJTIDEwNsKwNDQnMDkuMiJF!5e0!3m2!1sid!2sid!4v1764653321303!5m2!1sid!2sid"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  ></iframe>
                </motion.div>

                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55, duration: 0.6 }}
                  className="flex justify-center pt-6"
                >
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCountdown(true)}
                    className="px-8 py-3 border border-white/30 bg-white/10 backdrop-blur-md 
                 text-white uppercase tracking-widest text-xs md:text-sm
                  w-full rounded-lg"
                  >
                    Kembali ke Countdown
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
     
    </section>
  );
}
