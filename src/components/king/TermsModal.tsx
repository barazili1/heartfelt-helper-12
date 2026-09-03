import { Copy, TriangleAlert, X } from "lucide-react";
import { useState } from "react";

const PROMO_CODE = "CVB77";

const RULES = [
  { n: 1, text: "استخدم حساباً جديداً", highlight: false },
  { n: 2, text: "أدخل البروموكود عند التسجيل", highlight: false },
  { n: 3, text: "الحد الأدنى للإيداع", highlight: true },
];

export function TermsModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5" dir="rtl">
      <div
        className="absolute inset-0 animate-fade-in-soft"
        style={{ background: "rgba(2,9,15,0.82)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm animate-modal-in">
        <div
          className="relative rounded-2xl mx-auto w-full max-w-[360px] px-5 pt-6 pb-6"
          style={{
            background: "linear-gradient(#06202e 0%, #02080e 100%)",
            border: "1px solid rgba(56,189,248,0.5)",
            boxShadow: "0 0 50px rgba(56,189,248,0.45)",
          }}
        >
          <button
            type="button"
            aria-label="إغلاق"
            onClick={onClose}
            className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-white/80"
            style={{
              background: "rgba(2,13,22,0.7)",
              border: "1px solid rgba(56,189,248,0.4)",
            }}
          >
            <X className="w-3 h-3" />
          </button>

          <div className="flex items-center gap-2.5 mb-4 pr-1">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: "rgba(56,189,248,0.15)",
                border: "1px solid rgba(56,189,248,0.5)",
                boxShadow: "0 0 10px rgba(56,189,248,0.5)",
              }}
            >
              <TriangleAlert className="w-5 h-5 text-[#38BDF8]" strokeWidth={2.5} />
            </div>
            <div className="flex-1 text-right">
              <h3
                className="font-arabic font-black text-[18px] leading-none"
                style={{ color: "#38BDF8", textShadow: "0 0 10px rgba(56,189,248,0.7)" }}
              >
                تنبيه مهم
              </h3>
              <p className="text-[11px] text-white/55 font-arabic mt-1">اقرأ قبل البدء</p>
            </div>
          </div>

          <div className="space-y-2 mb-3.5">
            {RULES.map((r) => (
              <div
                key={r.n}
                className="flex items-center gap-2.5 px-3 py-2 rounded-md"
                style={{
                  background: "rgba(56,189,248,0.1)",
                  border: "1px solid rgba(56,189,248,0.28)",
                }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0"
                  style={{
                    background: "linear-gradient(#38BDF8, #04202e)",
                    boxShadow: "0 0 6px rgba(56,189,248,0.6)",
                  }}
                >
                  {r.n}
                </span>
                <span className="text-[13px] font-arabic text-white/95 flex-1 text-right">
                  {r.text}
                  {r.highlight ? (
                    <span className="text-[#22ff66] font-bold">
                      {" "}
                      500 ج.م أو <span dir="ltr">10$</span>
                    </span>
                  ) : null}
                </span>
              </div>
            ))}
          </div>

          <div
            className="rounded-lg px-3 py-2.5 mb-3.5 text-right"
            style={{
              background: "rgba(40,22,0,0.5)",
              border: "1px solid rgba(255,180,0,0.4)",
            }}
          >
            <p className="text-[12px] text-[#ffd27a] font-arabic leading-relaxed">
              <span className="font-bold">ملاحظة:</span> سيرفر تأكيد الشروط يقبل الإيداعات{" "}
              <span className="font-bold">
                500 ج.م أو <span dir="ltr">10$</span>
              </span>{" "}
              أو أكثر فقط، يجب ألا يقل إيداعك عن{" "}
              <span className="font-bold">
                500 ج.م أو <span dir="ltr">10$</span>
              </span>
              .
            </p>
          </div>

          <div className="-mt-1 mb-1 flex items-center justify-between">
            <span
              className="font-arabic text-[13px] font-bold text-[#38BDF8]"
              style={{ textShadow: "0 0 8px rgba(56,189,248,0.6)" }}
            >
              البرومو كود
            </span>
            <span
              className="font-display text-[10px] font-bold tracking-[0.3em] text-[#38BDF8]"
              style={{ textShadow: "0 0 8px rgba(56,189,248,0.6)" }}
            >
              PROMO CODE
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3.5">
            <button
              type="button"
              onClick={copy}
              aria-label="نسخ البرومو كود"
              className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-transform active:scale-90"
              style={{
                background: "linear-gradient(#38BDF8, #04202e)",
                border: "1px solid rgba(56,189,248,0.4)",
                boxShadow: "0 0 10px rgba(56,189,248,0.5)",
              }}
            >
              <Copy className="w-4 h-4 text-white" />
            </button>
            <div
              className="flex-1 h-10 rounded-lg flex items-center justify-center font-display font-bold text-white text-base tracking-[0.3em]"
              style={{
                background: "rgba(3,12,20,0.85)",
                border: "1px dashed rgba(56,189,248,0.6)",
                textShadow: "0 0 6px rgba(56,189,248,0.7)",
              }}
            >
              {copied ? "COPIED" : PROMO_CODE}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="relative w-full h-11 rounded-lg font-arabic font-bold text-[14px] text-white overflow-hidden active:scale-[0.98]"
            style={{
              background: "linear-gradient(#38BDF8 0%, #0A5C8A 60%, #041520 100%)",
              border: "1px solid rgba(56,189,248,0.45)",
              boxShadow: "0 0 16px rgba(56,189,248,0.6)",
            }}
          >
            <span className="relative z-10">فهمت، متابعة</span>
            <span className="absolute inset-0 animate-shimmer opacity-40" />
          </button>
        </div>
      </div>
    </div>
  );
}
