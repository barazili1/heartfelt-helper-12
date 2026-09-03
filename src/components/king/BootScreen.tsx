import { useEffect, useState } from "react";

import kingLogo from "@/assets/king-logo.png";
import { Backdrop } from "./Backdrop";

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

      <div className="relative z-10 flex flex-col items-center gap-7 animate-fade-up w-full">
        <div className="relative w-[200px] h-[200px] flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full animate-ring-pulse"
            style={{
              border: "1px solid rgba(56,189,248,0.4)",
              boxShadow:
                "0 0 40px rgba(56,189,248,0.45), inset 0 0 40px rgba(56,189,248,0.25)",
            }}
          />
          <div
            className="absolute rounded-full animate-spin-slow"
            style={{ inset: "18px", border: "1px dashed rgba(56,189,248,0.55)" }}
          />
          <div
            className="absolute rounded-full"
            style={{
              inset: "34px",
              border: "1px solid rgba(56,189,248,0.7)",
              boxShadow: "0 0 22px rgba(56,189,248,0.55)",
            }}
          />
          <div
            className="absolute rounded-full animate-pulse-red"
            style={{
              inset: "50px",
              background:
                "radial-gradient(circle at 50% 55%, rgba(56,189,248,0.45) 0%, rgba(14,64,96,0.15) 60%, transparent 80%)",
            }}
          />
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: "160px",
              height: "160px",
              border: "2px solid rgba(255,255,255,0.12)",
              boxShadow:
                "0 0 30px rgba(56,189,248,0.7), inset 0 0 18px rgba(0,0,0,0.55)",
              background: "#02080e",
            }}
          >
            <img
              src={kingLogo}
              alt="KING"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center space-y-1.5">
          <h1
            className="font-display font-black text-[40px] tracking-[0.18em] leading-none"
            style={{
              color: "#fff",
              textShadow:
                "0 0 18px rgba(56,189,248,0.9), 0 0 36px rgba(56,189,248,0.55)",
            }}
          >
            KING
          </h1>
          <div className="flex items-center justify-center gap-2">
            <span
              className="h-px w-10"
              style={{ background: "linear-gradient(90deg, transparent, #38BDF8)" }}
            />
            <span className="font-display text-[11px] tracking-[0.5em] text-[#8BE0FF]">
              V 1 · PREMIUM
            </span>
            <span
              className="h-px w-10"
              style={{ background: "linear-gradient(90deg, #38BDF8, transparent)" }}
            />
          </div>
        </div>

        <div className="w-72 space-y-2.5" dir="ltr">
          <div
            className="h-1.5 rounded-full overflow-hidden relative"
            style={{
              background: "rgba(2,13,22,0.8)",
              border: "1px solid rgba(56,189,248,0.4)",
              boxShadow: "inset 0 0 8px rgba(56,189,248,0.25)",
            }}
          >
            <div
              className="h-full transition-all duration-150"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #04202e, #38BDF8, #8BE0FF)",
                boxShadow: "0 0 14px #38BDF8",
              }}
            />
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />
          </div>
          <div className="flex justify-between text-[10px] font-display tracking-[0.25em]">
            <span className="text-white/65">{phase}</span>
            <span className="text-[#8BE0FF] tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      <p className="absolute bottom-5 left-0 right-0 text-center text-[10px] text-white/40 font-display tracking-[0.4em]">
        SECURE · ENCRYPTED · V1
      </p>
    </div>
  );
}
