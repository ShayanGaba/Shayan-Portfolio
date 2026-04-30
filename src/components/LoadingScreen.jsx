import { useEffect, useState } from "react";

export const LoadingScreen = ({ fadeOut }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const name = "SHAYAN GABA";

  useEffect(() => {
    let val = 0;
    const interval = setInterval(() => {
      if (val < 60) val += 4;
      else if (val < 85) val += 2;
      else if (val < 98) val += 0.8;
      else { val = 100; clearInterval(interval); }
      setDisplayProgress(Math.floor(val));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white overflow-hidden transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-white/20" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-white/20" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-white/20" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/20" />

      <div className="relative z-10 flex flex-col items-center">

        <div className="flex mb-5" aria-label="Shayan Gaba">
          {name.split("").map((char, i) => (
            <span
              key={i}
              className="text-2xl md:text-4xl font-light tracking-[0.6rem]"
              style={{
                opacity: 0,
                transform: "translateY(16px)",
                animation: `letterIn 0.5s cubic-bezier(0.22,1,0.36,1) ${
                  i * 0.055 + 0.1
                }s forwards`,
                display: "inline-block",
                minWidth: char === " " ? "1.5rem" : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        <p
          className="text-xs md:text-sm font-light tracking-[0.3rem] uppercase text-white/35 mb-14"
          style={{
            opacity: 0,
            animation: "fadeUp 0.7s ease 0.75s forwards",
          }}
        >
          Web Developer &amp; Designer
        </p>

        <div
          className="flex flex-col items-center gap-3"
          style={{ opacity: 0, animation: "fadeUp 0.6s ease 1s forwards" }}
        >
          <div className="relative w-48 md:w-64 h-px bg-white/10">
            <div
              className="absolute top-0 left-0 h-px bg-white transition-all duration-100 ease-linear"
              style={{ width: `${displayProgress}%` }}
            >
              <div
                className="absolute -right-[4px] -top-[4px] w-2 h-2 rounded-full bg-white"
                style={{ boxShadow: "0 0 8px 2px rgba(255,255,255,0.5)" }}
              />
            </div>
          </div>

          <span className="text-xs font-light tracking-[0.25rem] text-white/30 tabular-nums">
            {displayProgress}%
          </span>
        </div>
      </div>

      <span
        className="absolute bottom-9 left-10 text-[10px] font-light tracking-[0.2rem] text-white/15"
        style={{ opacity: 0, animation: "fadeUp 0.5s ease 1.1s forwards" }}
      >
        © 2025
      </span>

      <div
        className="absolute bottom-9 right-10 flex items-center gap-1.5"
        style={{ opacity: 0, animation: "fadeUp 0.5s ease 1.1s forwards" }}
      >
        {[0, 0.2, 0.4].map((delay, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-white/40"
            style={{ animation: `pulse 1.4s ease-in-out ${delay}s infinite` }}
          />
        ))}
      </div>

      <style>{`
        @keyframes letterIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50%       { opacity: 1;    transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};