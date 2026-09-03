import { Copy, Download, ShieldCheck, TriangleAlert, X } from "lucide-react";
import { useState } from "react";

const PROMO_CODE = "wni33";
const PASSWORD = "wni33";
const WINWIN_URL =
  "https://refpa98980.com/L?tag=d_5876143m_68383c_&site=5876143&ad=68383";

const RULES = [
  { n: 1, text: "استخدم حساباً جديداً", highlight: false },
  { n: 2, text: "أدخل البروموكود عند التسجيل", highlight: false },
  { n: 3, text: "الحد الأدنى للإيداع", highlight: true },
];

function CodeRow({
  labelAr,
  labelEn,
  value,
}: {
  labelAr: string;
  labelEn: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="font-arabic text-[12px] font-bold text-[#8BE0FF]">
          {labelAr}
        </span>
        <span className="font-display text-[9px] font-bold tracking-[0.32em] text-white/40">
          {labelEn}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={copy}
          aria-label={`نسخ ${labelAr}`}
          className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform active:scale-90"
          style={{
            background: "linear-gradient(160deg, #38BDF8, #0A5C8A)",
            border: "1px solid rgba(139,224,255,0.45)",
            boxShadow: "0 6px 18px -8px rgba(56,189,248,0.9)",
          }}
        >
          <Copy className="w-4 h-4 text-[#02080e]" strokeWidth={2.6} />
        </button>
        <div
          className="flex-1 h-10 rounded-xl flex items-center justify-center font-display font-bold text-white text-[15px] tracking-[0.3em]"
          style={{
            background: "rgba(4,14,22,0.9)",
            border: "1px dashed rgba(56,189,248,0.5)",
            textShadow: "0 0 10px rgba(56,189,248,0.55)",
          }}
        >
          {copied ? "COPIED" : value}
        </div>
      </div>
    </div>
  );
}

export function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5" dir="rtl">
      <div
        className="absolute inset-0 animate-fade-in-soft"
        style={{ background: "rgba(1,6,10,0.88)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm animate-modal-in">
        <div
          className="relative rounded-3xl mx-auto w-full max-w-[368px] px-5 pt-6 pb-5 max-h-[88dvh] overflow-y-auto"
          style={{
            background:
              "linear-gradient(165deg, rgba(10,32,46,0.96) 0%, rgba(2,8,14,0.99) 62%)",
            border: "1px solid rgba(56,189,248,0.32)",
            boxShadow:
              "0 30px 70px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 60px -20px rgba(56,189,248,0.45)",
          }}
        >
          <button
            type="button"
            aria-label="إغلاق"
            onClick={onClose}
            className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-white/70 transition-colors hover:text-white"
            style={{
              background: "rgba(2,13,22,0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-3 mb-4 pr-1">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(56,189,248,0.12)",
                border: "1px solid rgba(56,189,248,0.38)",
              }}
            >
              <TriangleAlert className="w-5 h-5 text-[#8BE0FF]" strokeWidth={2.4} />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-arabic font-black text-[19px] leading-none text-white">
                تنبيه مهم
              </h3>
              <p className="text-[11px] text-white/45 font-arabic mt-1.5">
                اقرأ الشروط قبل البدء
              </p>
            </div>
          </div>

          <div
            className="rounded-2xl p-3.5 mb-3"
            style={{
              background:
                "linear-gradient(150deg, rgba(56,189,248,0.16), rgba(56,189,248,0.04))",
              border: "1px solid rgba(139,224,255,0.4)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold text-[#02080e] shrink-0 font-display"
                style={{ background: "linear-gradient(#A8E4FF, #38BDF8)" }}
              >
                1
              </span>
              <p className="text-[13px] font-arabic font-bold text-white flex-1 text-right leading-snug">
                تحميل منصة <span dir="ltr">winwin</span> شرط أساسي
              </p>
              <a
                href={WINWIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-1.5 h-9 px-3 rounded-xl font-arabic font-bold text-[12.5px] text-[#02080e] transition-transform active:scale-95"
                style={{
                  background: "linear-gradient(100deg, #A8E4FF, #38BDF8 60%, #0A5C8A)",
                  boxShadow: "0 8px 20px -10px rgba(56,189,248,0.95)",
                }}
              >
                <Download className="w-3.5 h-3.5" strokeWidth={2.8} />
                تحميل
              </a>
            </div>

          </div>

          <div className="space-y-2 mb-3">
            {RULES.map((r) => (
              <div
                key={r.n}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold text-[#8BE0FF] shrink-0 font-display"
                  style={{
                    background: "rgba(56,189,248,0.12)",
                    border: "1px solid rgba(56,189,248,0.3)",
                  }}
                >
                  {r.n + 1}
                </span>
                <span className="text-[13px] font-arabic text-white/90 flex-1 text-right">
                  {r.text}
                  {r.highlight ? (
                    <span className="text-[#8BE0FF] font-bold">
                      {" "}
                      500 ج.م أو <span dir="ltr">10$</span>
                    </span>
                  ) : null}
                </span>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl px-3 py-2.5 mb-4 text-right"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <p className="text-[11.5px] text-white/60 font-arabic leading-relaxed">
              <span className="font-bold text-white/80">ملاحظة:</span> سيرفر تأكيد
              الشروط يقبل الإيداعات{" "}
              <span className="font-bold text-[#8BE0FF]">
                500 ج.م أو <span dir="ltr">10$</span>
              </span>{" "}
              أو أكثر فقط.
            </p>
          </div>

          <div className="mb-4">
            <CodeRow labelAr="البرومو كود" labelEn="PROMO CODE" value={PROMO_CODE} />
          </div>


          <button
            type="button"
            onClick={onClose}
            className="relative w-full h-12 rounded-2xl font-arabic font-bold text-[14.5px] text-white overflow-hidden active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(150deg, rgba(56,189,248,0.22), rgba(2,13,22,0.9))",
              border: "1px solid rgba(56,189,248,0.4)",
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8BE0FF]" />
              فهمت، متابعة
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
