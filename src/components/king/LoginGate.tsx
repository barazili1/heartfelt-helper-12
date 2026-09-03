import { Lock } from "lucide-react";
import { useRef, useState } from "react";

import kingLogo from "@/assets/king-logo.png";
import { Backdrop } from "./Backdrop";
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
      window.setTimeout(() => inputs.current[Math.min(cursor, ID_LENGTH - 1)]?.focus(), 0);
      return next;
    });
    setStatus("idle");
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < ID_LENGTH - 1) inputs.current[i + 1]?.focus();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || status === "checking") return;
    setStatus("checking");
    window.setTimeout(() => setStatus("error"), 1800);
  };

  return (
    <div
      className="relative min-h-[100dvh] flex flex-col px-4 pt-[38px] pb-4"
      dir="rtl"
    >
      <Backdrop />

      <div className="relative z-10 flex items-center justify-between" dir="ltr">
        <div className="font-display text-[10px] tracking-[0.36em] text-white/45">
          {BRAND_EN} · V1
        </div>
        <div
          className="flex items-center gap-2 h-[25px] px-3 rounded-full text-[10px] font-display tracking-[0.28em] text-white/85"
          style={{
            background: "rgba(3,12,20,0.5)",
            border: "1px solid rgba(56,189,248,0.48)",
            boxShadow:
              "0 0 13px rgba(56,189,248,0.34), inset 0 0 10px rgba(56,189,248,0.1)",
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

      <div className="relative z-10 flex justify-center mt-[15px]">
        <div className="relative w-[190px] h-[190px] flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full animate-ring-pulse"
            style={{
              border: "1px solid rgba(56,189,248,0.42)",
              boxShadow:
                "0 0 30px rgba(56,189,248,0.38), inset 0 0 30px rgba(56,189,248,0.2)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              inset: "14px",
              border: "1px solid rgba(56,189,248,0.62)",
              boxShadow: "0 0 22px rgba(56,189,248,0.5)",
            }}
          />
          <div
            className="absolute rounded-full animate-pulse-red"
            style={{
              inset: "28px",
              background:
                "radial-gradient(circle at 50% 60%, rgba(56,189,248,0.45) 0%, rgba(2,13,22,0.2) 55%, transparent 75%)",
              border: "1.5px solid rgba(56,189,248,0.88)",
            }}
          />
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: "124px",
              height: "124px",
              border: "2px solid rgba(56,189,248,0.35)",
              boxShadow:
                "0 0 28px rgba(56,189,248,0.7), inset 0 0 16px rgba(0,0,0,0.55)",
              background: "#02080e",
            }}
          >
            <img
              src={kingLogo}
              alt={BRAND_AR}
              width={124}
              height={124}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center mt-[18px] space-y-1 animate-fade-up">
        <h1
          className="font-arabic font-bold text-[28px] leading-tight"
          style={{
            background:
              "linear-gradient(180deg, #FFFFFF 5%, #8BE0FF 60%, #38BDF8 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 14px rgba(56,189,248,0.6))",
          }}
        >
          بوابة الوصول الآمن
        </h1>
        <p className="font-arabic text-[13px] font-bold text-[#8BE0FF]">{BRAND_AR}</p>
        <p className="text-[12px] text-white/58 font-arabic">
          أدخل معرف اللاعب وكلمة المرور للمصادقة
        </p>
      </div>

      <form className="relative z-10 mt-[22px] space-y-[15px]" onSubmit={submit}>
        <div className="flex items-center justify-between" dir="ltr">
          <span className="text-[11px] text-white/45 font-display tabular-nums">
            {filled}/{ID_LENGTH}
          </span>
          <span className="font-arabic text-sm text-white">
            معرف اللاعب{" "}
            <span className="text-[#38BDF8] font-display font-bold">ID</span>
          </span>
        </div>

        <div className="flex gap-[8px] justify-between" dir="ltr">
          {digits.map((d, i) => {
            const active = focused === i;
            return (
              <div
                key={i}
                className="flex-1 h-[43px] max-w-[31px] rounded-[13px] flex items-center justify-center animate-cell-reveal"
                style={{
                  background:
                    "linear-gradient(rgba(3,12,20,0.62), rgba(2,9,15,0.84))",
                  border: `1.5px solid rgba(56,189,248,${active || d ? 0.95 : 0.55})`,
                  boxShadow: active
                    ? "0 0 16px rgba(56,189,248,0.65)"
                    : "0 0 8px rgba(56,189,248,0.25)",
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
                  className={`w-full h-full bg-transparent text-center outline-none text-white font-display text-[20px] font-bold tabular-nums ${d ? "animate-digit-pop" : ""}`}
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-[2px]" dir="ltr">
          <span className="text-[10px] tracking-[0.3em] text-white/45 font-display">
            ENCRYPTED
          </span>
          <span className="font-arabic text-sm text-white">كلمة المرور</span>
        </div>

        <div
          className="rounded-[18px] h-[49px] px-4 flex items-center gap-2.5 transition-all"
          style={{
            background: "linear-gradient(rgba(2,13,22,0.68), rgba(2,9,15,0.86))",
            border: "1.5px solid rgba(56,189,248,0.52)",
            boxShadow:
              "0 0 16px rgba(56,189,248,0.34), inset 0 0 11px rgba(56,189,248,0.1)",
          }}
        >
          <Lock className="w-3.5 h-3.5 text-[#38BDF8]" />
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
              width: `${((filled / ID_LENGTH) * 0.7 + Math.min(password.length, 6) / 6 * 0.3) * 100}%`,
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
          className="relative w-full h-[56px] rounded-[22px] font-arabic text-[17px] font-bold text-white overflow-hidden transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-[1px]"
          style={{
            background: "linear-gradient(#38BDF8 0%, #0A5C8A 52%, #041520 100%)",
            boxShadow:
              "0 0 34px rgba(56,189,248,0.62), inset 0 1px 0 rgba(56,189,248,0.24), inset 0 -7px 16px rgba(0,0,0,0.42)",
            border: "1px solid rgba(56,189,248,0.46)",
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {status === "checking" ? "جارٍ التحقق..." : "دخول آمن"}
          </span>
          <span className="absolute inset-0 animate-shimmer opacity-50" />
        </button>
      </form>

      <p className="relative z-10 mt-auto pt-2 text-center text-[10px] text-white/40 font-display tracking-wider">
        {BRAND_EN} · PREMIUM ENGINE ©
      </p>
    </div>
  );
}
