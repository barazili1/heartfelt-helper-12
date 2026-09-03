import { useEffect, useState } from "react";

import kingLogo from "@/assets/king-logo.png";
import { Backdrop } from "./Backdrop";
import { BRAND_AR, BRAND_EN, BRAND_TAG } from "./brand";

const PHASES = [
  "INITIALIZING CORE",
  "LINKING NODES",
  "DECRYPTING PROTOCOL",
  "VERIFYING SIGNATURE",
  "SYSTEM READY",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const started = Date.now();
    const total = 4200;
    const id = window.setInterval(() => {
      const pct = Math.min(100, ((Date.now() - started) / total) * 100);
      setProgress(pct);
      if (pct >= 100) {
        window.clearInterval(id);
        window.setTimeout(onDone, 450);
      }
    }, 60);
    return () => window.clearInterval(id);
  }, [onDone]);

  const phase =
    PHASES[Math.min(PHASES.length - 1, Math.floor((progress / 100) * PHASES.length))];

  return (
    <div
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden"
      dir="rtl"
    >
      <Backdrop crosshair />

      <div className="relative z-10 flex flex-col items-center gap-8 animate-fade-up w-full">
        <div className="relative w-[200px] h-[200px] flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full animate-ring-pulse"
            style={{
              border: "1px solid rgba(56,189,248,0.28)",
              boxShadow:
                "0 0 50px -10px rgba(56,189,248,0.5), inset 0 0 40px rgba(56,189,248,0.14)",
            }}
          />
          <div
            className="absolute rounded-full animate-spin-slow"
            style={{ inset: "18px", border: "1px dashed rgba(139,224,255,0.4)" }}
          />
          <div
            className="absolute rounded-full"
            style={{
              inset: "34px",
              border: "1px solid rgba(56,189,248,0.5)",
            }}
          />
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: "150px",
              height: "150px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 20px 50px -20px rgba(56,189,248,0.85), inset 0 0 22px rgba(0,0,0,0.6)",
              background: "#02080e",
            }}
          >
            <img
              src={kingLogo}
              alt={BRAND_AR}
              width={150}
              height={150}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center space-y-2.5">
          <h1
            className="font-arabic font-black text-[30px] leading-none"
            style={{
              background: "linear-gradient(180deg, #FFFFFF 10%, #8BE0FF 90%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 18px rgba(56,189,248,0.5))",
            }}
          >
            {BRAND_AR}
          </h1>
          <div className="flex items-center justify-center gap-2.5" dir="ltr">
            <span
              className="h-px w-9"
              style={{ background: "linear-gradient(90deg, transparent, #38BDF8)" }}
            />
            <span className="font-display text-[10px] tracking-[0.42em] text-white/55">
              {BRAND_EN} · {BRAND_TAG}
            </span>
            <span
              className="h-px w-9"
              style={{ background: "linear-gradient(90deg, #38BDF8, transparent)" }}
            />
          </div>
        </div>

        <div className="w-72 space-y-2.5" dir="ltr">
          <div
            className="h-1 rounded-full overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(56,189,248,0.2)",
            }}
          >
            <div
              className="h-full transition-all duration-150"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #0A5C8A, #38BDF8, #A8E4FF)",
                boxShadow: "0 0 12px #38BDF8",
              }}
            />
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />
          </div>
          <div className="flex justify-between text-[10px] font-display tracking-[0.25em]">
            <span className="text-white/55">{phase}</span>
            <span className="text-[#8BE0FF] tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      <p className="absolute bottom-5 left-0 right-0 text-center text-[10px] text-white/30 font-display tracking-[0.4em]">
        SECURE · ENCRYPTED · V1
      </p>
    </div>
  );
}
