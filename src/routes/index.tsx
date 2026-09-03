import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { BootScreen } from "@/components/king/BootScreen";
import { LoginGate } from "@/components/king/LoginGate";
import { TermsModal } from "@/components/king/TermsModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الاسكربت الروسي — بوابة الوصول الآمن" },
      {
        name: "description",
        content:
          "بوابة الاسكربت الروسي الآمنة: أدخل معرف اللاعب وكلمة المرور للمصادقة والوصول إلى المحرك المميز.",
      },
      { property: "og:title", content: "الاسكربت الروسي — بوابة الوصول الآمن" },
      {
        property: "og:description",
        content: "مصادقة مشفّرة للوصول إلى المحرك المميز.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);
  const [termsSeen, setTermsSeen] = useState(false);

  if (!booted) return <BootScreen onDone={() => setBooted(true)} />;

  return (
    <>
      <LoginGate />
      {!termsSeen ? <TermsModal onClose={() => setTermsSeen(true)} /> : null}
    </>
  );
}
