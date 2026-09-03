import { useEffect, useState } from "react";

type Particle = {
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

/** Ambient background: radial glow, grid, floating particles, crosshair lines. */
export function Backdrop({ crosshair = false }: { crosshair?: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 22 }, () => ({
        left: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        opacity: 0.25 + Math.random() * 0.35,
        duration: 18 + Math.random() * 16,
        delay: -Math.random() * 25,
      })),
    );
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(10,92,138,0.35) 0%, rgba(10,2,6,0) 55%), radial-gradient(ellipse at bottom, rgba(56,189,248,0.18) 0%, rgba(10,2,6,0) 60%), #02080e",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-bg opacity-30"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      >
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute bottom-[-20px] rounded-full animate-float-up"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: "#38BDF8",
              boxShadow: `0 0 ${p.size + 4}px rgba(56,189,248,0.55)`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              willChange: "transform",
            }}
          />
        ))}
      </div>
      {crosshair ? (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-1/2 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(56,189,248,0.25), transparent)",
            }}
          />
          <div
            className="absolute top-0 bottom-0 left-1/2 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(56,189,248,0.25), transparent)",
            }}
          />
        </div>
      ) : null}
    </>
  );
}
