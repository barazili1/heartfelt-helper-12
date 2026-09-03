import { Lock, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";

import kingLogo from "@/assets/king-logo.png";
import { Backdrop } from "./Backdrop";
import { ParticleField } from "./ParticleField";
import { BRAND_AR, BRAND_EN } from "./brand";

const ID_LENGTH = 10;

export function LoginGate() {
  const [digits, setDigits] = useState<string[]>(Array(ID_LENGTH).fill(""));
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "checking" | "error">("idle");
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const filled = digits.filter(Boolean).length;
  const ready = filled === ID_LENGTH && password.length >= 4;

  const setDigit = (i: number, raw: string) => {
    const clean = raw.replace(/\D/g, "");
    if (!clean) {
      setDigits((prev) => prev.map((d, idx) => (idx === i ? "" : d)));
      return;
    }
    setDigits((prev) => {
      const next = [...prev];
      let cursor = i;
      for (const ch of clean) {
        if (cursor >= ID_LENGTH) break;
        next[cursor] = ch;
        cursor += 1;
      }
      window.setTimeout(
        () => inputs.current[Math.min(cursor, ID_LENGTH - 1)]?.focus(),
        0,
      );
      return next;
    });
    setStatus("idle");
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < ID_LENGTH - 1) inputs.current[i + 1]?.focus();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || status === "checking") return;
    setStatus("checking");
    window.setTimeout(() => setStatus("error"), 1800);
  };

  const progress =
    ((filled / ID_LENGTH) * 0.7 + (Math.min(password.length, 6) / 6) * 0.3) * 100;

  return (
    <div
      className="relative min-h-[100dvh] flex flex-col items-center px-4 sm:px-6 pt-7 pb-6"
      dir="rtl"
    >
      <Backdrop />
      <ParticleField count={70} />

      <div className="relative z-10 w-full max-w-[520px] flex items-center justify-between" dir="ltr">
        <div className="font-display text-[9.5px] sm:text-[10px] tracking-[0.36em] text-white/45">
          {BRAND_EN} · V1
        </div>
        <div
          className="flex items-center gap-2 h-[26px] px-3 rounded-full text-[9.5px] sm:text-[10px] font-display tracking-[0.26em] text-white/85"
          style={{
            background: "rgba(3,12,20,0.5)",
            border: "1px solid rgba(56,189,248,0.42)",
            boxShadow: "0 0 14px rgba(56,189,248,0.28)",
          }}
        >
          SYSTEM ONLINE
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-[#22ff66] opacity-70 animate-ping" />
            <span
              className="relative rounded-full w-1.5 h-1.5 bg-[#22ff66]"
              style={{ boxShadow: "0 0 6px #22ff66" }}
            />
          </span>
        </div>
      </div>

      <div
        className="relative z-10 w-full max-w-[520px] mt-5 rounded-[30px] px-5 sm:px-8 pt-8 pb-7 animate-fade-up"
        style={{
          background:
            "linear-gradient(168deg, rgba(9,28,42,0.72) 0%, rgba(2,8,14,0.92) 70%)",
          border: "1px solid rgba(56,189,248,0.22)",
          boxShadow:
            "0 40px 90px -40px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 70px -34px rgba(56,189,248,0.6)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex justify-center">
          <div className="relative w-[clamp(120px,32vw,168px)] aspect-square flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full animate-ring-pulse"
              style={{
                border: "1px solid rgba(56,189,248,0.35)",
                boxShadow: "0 0 40px -12px rgba(56,189,248,0.5)",
              }}
            />
            <div
              className="absolute rounded-full animate-spin-slow"
              style={{ inset: "9%", border: "1px dashed rgba(139,224,255,0.3)" }}
            />
            <div
              className="relative rounded-full overflow-hidden w-[66%] aspect-square"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow:
                  "0 0 34px -6px rgba(56,189,248,0.75), inset 0 0 18px rgba(0,0,0,0.6)",
                background: "#02080e",
              }}
            >
              <img src={kingLogo} alt={BRAND_AR} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="text-center mt-5 space-y-1.5">
          <h1
            className="font-arabic font-bold text-[clamp(23px,6vw,34px)] leading-tight"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 5%, #8BE0FF 62%, #38BDF8 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 16px rgba(56,189,248,0.5))",
            }}
          >
            بوابة الوصول الآمن
          </h1>
          <p className="font-arabic text-[12.5px] sm:text-sm font-bold text-[#8BE0FF]">
            {BRAND_AR}
          </p>
          <p className="text-[11.5px] sm:text-[13px] text-white/55 font-arabic">
            أدخل معرف اللاعب وكلمة المرور للمصادقة
          </p>
        </div>

        <form className="mt-7 space-y-4" onSubmit={submit}>
          <div className="flex items-center justify-between" dir="ltr">
            <span className="text-[11px] text-white/45 font-display tabular-nums">
              {filled}/{ID_LENGTH}
            </span>
            <span className="font-arabic text-[13.5px] sm:text-sm text-white">
              معرف اللاعب{" "}
              <span className="text-[#38BDF8] font-display font-bold">ID</span>
            </span>
          </div>

          <div className="flex gap-[6px] sm:gap-2 justify-between" dir="ltr">
            {digits.map((d, i) => {
              const active = focused === i;
              return (
                <div
                  key={i}
                  className="flex-1 aspect-[3/4] max-w-[40px] rounded-[12px] flex items-center justify-center animate-cell-reveal"
                  style={{
                    background:
                      "linear-gradient(rgba(3,12,20,0.7), rgba(2,9,15,0.9))",
                    border: `1.5px solid rgba(56,189,248,${active || d ? 0.95 : 0.42})`,
                    boxShadow: active
                      ? "0 0 18px rgba(56,189,248,0.6)"
                      : "0 0 8px rgba(56,189,248,0.18)",
                    transition: "border-color 140ms, box-shadow 140ms",
                    animationDelay: `${i * 35}ms`,
                  }}
                >
                  <input
                    ref={(el) => {
                      inputs.current[i] = el;
                    }}
                    inputMode="numeric"
                    maxLength={ID_LENGTH}
                    value={d}
                    aria-label={`رقم ${i + 1}`}
                    onFocus={() => setFocused(i)}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => onKeyDown(i, e)}
                    className={`w-full h-full bg-transparent text-center outline-none text-white font-display text-[17px] sm:text-[21px] font-bold tabular-nums ${d ? "animate-digit-pop" : ""}`}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-1" dir="ltr">
            <span className="text-[10px] tracking-[0.3em] text-white/40 font-display">
              ENCRYPTED
            </span>
            <span className="font-arabic text-[13.5px] sm:text-sm text-white">
              كلمة المرور
            </span>
          </div>

          <div
            className="rounded-[18px] h-[52px] px-4 flex items-center gap-3"
            style={{
              background: "linear-gradient(rgba(2,13,22,0.72), rgba(2,9,15,0.9))",
              border: "1.5px solid rgba(56,189,248,0.42)",
              boxShadow: "inset 0 0 14px rgba(56,189,248,0.08)",
            }}
          >
            <Lock className="w-4 h-4 text-[#38BDF8]" />
            <input
              dir="ltr"
              type="password"
              placeholder="••••••"
              value={password}
              aria-label="كلمة المرور"
              onChange={(e) => {
                setPassword(e.target.value);
                setStatus("idle");
              }}
              className="flex-1 bg-transparent outline-none text-white text-base tracking-[0.35em] text-right"
            />
          </div>

          <div className="h-[3px] rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, #0A5C8A 0%, #38BDF8 60%, #A8E4FF 100%)",
                boxShadow: "0 0 8px #8BE0FF",
              }}
            />
          </div>

          {status === "error" ? (
            <p className="text-center font-arabic text-[12px] text-[#ff6b81] animate-fade-up">
              بيانات غير صحيحة، تأكد من معرف اللاعب وكلمة المرور
            </p>
          ) : null}

          <button
            type="submit"
            disabled={!ready || status === "checking"}
            className="relative w-full h-[56px] rounded-[20px] font-arabic text-[16.5px] font-bold text-white overflow-hidden transition-all active:scale-[0.98] disabled:opacity-45 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(#38BDF8 0%, #0A5C8A 52%, #041520 100%)",
              boxShadow:
                "0 18px 40px -20px rgba(56,189,248,0.9), inset 0 1px 0 rgba(168,228,255,0.3)",
              border: "1px solid rgba(56,189,248,0.45)",
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <ShieldCheck className="w-4.5 h-4.5" />
              {status === "checking" ? "جارٍ التحقق..." : "دخول آمن"}
            </span>
            <span className="absolute inset-0 animate-shimmer opacity-45" />
          </button>
        </form>
      </div>

      <p className="relative z-10 mt-auto pt-5 text-center text-[9.5px] sm:text-[10px] text-white/35 font-display tracking-[0.3em]">
        {BRAND_EN} · PREMIUM ENGINE ©
      </p>
    </div>
  );
}
