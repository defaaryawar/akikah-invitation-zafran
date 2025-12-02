// AttendenceSection.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function AttendenceSection() {
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);

  return (
    <section className="h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 snap-start snap-always px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative w-full max-w-4xl md:max-w-5xl"
      >
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-gray-900/70 to-black/70 rounded-2xl" />

        <div className="relative p-6 md:p-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="w-12 h-px bg-white/30 mx-auto mb-3" />
            <h2 className="text-white/60 text-xs tracking-[0.3em] uppercase mb-1">
              Konfirmasi Kehadiran
            </h2>
            <h3 className="text-2xl md:text-4xl font-serif text-white">Apakah Anda Akan Hadir?</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAttendance("yes")}
              className={`flex items-center gap-3 px-6 py-4 rounded-lg text-white uppercase tracking-wider transition-colors ${
                attendance === "yes" ? "bg-green-600" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              Ya, Saya Akan Hadir
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAttendance("no")}
              className={`flex items-center gap-3 px-6 py-4 rounded-lg text-white uppercase tracking-wider transition-colors ${
                attendance === "no" ? "bg-red-600" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <XCircle className="w-5 h-5" />
              Maaf, Tidak Bisa Hadir
            </motion.button>
          </motion.div>

          {attendance && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <p className="text-white/70 text-sm md:text-base">
                Terima kasih atas konfirmasinya! Kami sangat menantikan kehadiran Anda.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
