import { useState } from "react";

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [splitCurtain, setSplitCurtain] = useState(false);

  const handleBukaUndangan = () => {
    setSplitCurtain(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="absolute inset-0 z-50 overflow-hidden bg-black">
      <div
        className="absolute top-0 left-0 right-0 h-1/2 bg-black flex items-end justify-center pb-12 transition-transform duration-1200 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform: splitCurtain ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <div
          className="text-center transition-all duration-500"
          style={{
            opacity: splitCurtain ? 0 : 1,
            transform: splitCurtain ? "translateY(-40px)" : "translateY(0)",
          }}
        >
          <div className="w-24 h-px bg-white/30 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-serif text-white tracking-widest mb-2">
            AQIQAH
          </h1>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-black flex items-start justify-center pt-12 transition-transform duration-1200 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform: splitCurtain ? "translateY(100%)" : "translateY(0)",
        }}
      >
        <div
          className="text-center transition-all duration-500"
          style={{
            opacity: splitCurtain ? 0 : 1,
            transform: splitCurtain ? "translateY(40px)" : "translateY(0)",
          }}
        >
          <h2 className="text-5xl md:text-6xl font-serif text-white tracking-widest mb-6">
            ZAFRAN
          </h2>
          <div className="w-24 h-px bg-white/30 mx-auto mb-8" />

          {!splitCurtain && (
            <button
              onClick={handleBukaUndangan}
              className="px-8 py-3 border-2 border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              Buka Undangan
            </button>
          )}
        </div>
      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-px bg-white/40 transition-all duration-700"
        style={{
          opacity: splitCurtain ? 0 : 1,
          transform: splitCurtain
            ? "translate(-50%, -50%) scaleX(0)"
            : "translate(-50%, -50%) scaleX(1)",
        }}
      />

      {[
        { pos: "top-8 left-8", border: "border-t border-l" },
        { pos: "top-8 right-8", border: "border-t border-r" },
        { pos: "bottom-8 left-8", border: "border-b border-l" },
        { pos: "bottom-8 right-8", border: "border-b border-r" },
      ].map((corner, i) => (
        <div
          key={i}
          className={`absolute ${corner.pos} w-12 h-12 ${corner.border} border-white/20 transition-opacity duration-500`}
          style={{ opacity: splitCurtain ? 0 : 1 }}
        />
      ))}
    </div>
  );
}

export default SplashScreen;
