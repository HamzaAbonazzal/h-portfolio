"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Languages } from "lucide-react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // ✅ تعطيل استعادة التمرير الافتراضي من المتصفح
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "scrollRestoration" in window.history
    ) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // ✅ استعادة الموضع عند تغيير اللغة
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const saved = sessionStorage.getItem("pendingScrollY");
    if (!saved) return;

    const y = parseInt(saved, 10);

    // نعيد الموضع فوراً بدون أي تأخير مرئي
    window.scrollTo(0, y);
    sessionStorage.removeItem("pendingScrollY");

    // محاولة ثانية بعد أن تُبنى الصفحة بالكامل (للاحتياط)
    const raf = requestAnimationFrame(() => {
      window.scrollTo(0, y);
    });

    return () => cancelAnimationFrame(raf);
  }, [locale]);

  const toggleLocale = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";

    // ✅ حفظ آمن
    try {
      sessionStorage.setItem("pendingScrollY", window.scrollY.toString());
    } catch (e) {
      console.warn("Failed to save scroll position");
    }

    router.replace(pathname, { locale: nextLocale });
  };

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("pendingScrollY");
      if (!saved) return;

      const y = parseInt(saved, 10);
      if (isNaN(y)) return;

      window.scrollTo(0, y);
      sessionStorage.removeItem("pendingScrollY");
    } catch (e) {
      console.warn("Failed to restore scroll position");
    }
  }, [locale]);

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 px-4 h-10 rounded-full
                 border border-gold-500/30 hover:border-gold-500
                 hover:bg-gold-500/10 transition-all duration-300
                 text-sm font-medium hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
    >
      <Languages className="w-4 h-4 text-gold-500" />
      <span>{locale === "ar" ? "English" : "العربية"}</span>
    </button>
  );
}
