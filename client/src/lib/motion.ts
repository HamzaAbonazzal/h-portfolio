import type { Variants } from "framer-motion";

// ═══════════════════════════════════════
// 🎯 الإعدادات المركزية للأنميشن
// ═══════════════════════════════════════
// ✏️ عدّل القيم هنا فقط، وسيُطبّق التغيير في كل الموقع

export const MOTION_CONFIG = {
  // منحنى التخفيف الاحترافي (Expo Out)
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  
  // المدد الزمنية
  duration: {
    fast: 0.25,
    normal: 0.35,
    slow: 0.5,
  },
  
  // التتابع (Stagger) بين العناصر
  stagger: {
    fast: 0.04,
    normal: 0.06,
    slow: 0.08,
  },
  
  // نقطة بداية ظهور القسم عند التمرير
  viewportMargin: "-30px",
  
  // إعدادات Hover
  hover: {
    y: -6,
    duration: 0.18,
  },
};

// ═══════════════════════════════════════
// 📦 Variants الجاهزة للاستخدام
// ═══════════════════════════════════════

// حاوية تتتابع فيها العناصر
export const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: MOTION_CONFIG.stagger.fast,
      delayChildren: 0.05,
    },
  },
};

// عنصر يظهر من الأسفل
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_CONFIG.duration.normal,
      ease: MOTION_CONFIG.ease,
    },
  },
};

// عنصر يظهر من اليسار
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: MOTION_CONFIG.duration.normal,
      ease: MOTION_CONFIG.ease,
    },
  },
};

// عنصر يظهر من اليمين
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: MOTION_CONFIG.duration.normal,
      ease: MOTION_CONFIG.ease,
    },
  },
};

// عنصر يظهر بحجم صغير ثم يكبر
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: MOTION_CONFIG.duration.fast,
      ease: MOTION_CONFIG.ease,
    },
  },
};

// ═══════════════════════════════════════
// 🎨 دوال مساعدة (Helpers)
// ═══════════════════════════════════════

// إعدادات viewport الجاهزة
export const viewport = {
  once: true,
  margin: MOTION_CONFIG.viewportMargin,
} as const;

// إعدادات Hover للبطاقات
export const hoverLift = {
  y: MOTION_CONFIG.hover.y,
  transition: {
    duration: MOTION_CONFIG.hover.duration,
    ease: MOTION_CONFIG.ease,
  },
};

// Transition بسيط للعناصر
export const transitionNormal = {
  duration: MOTION_CONFIG.duration.normal,
  ease: MOTION_CONFIG.ease,
};

export const transitionFast = {
  duration: MOTION_CONFIG.duration.fast,
  ease: MOTION_CONFIG.ease,
};

// دالة لإنشاء transition مع تأخير
export const withDelay = (index: number, base = 0.05) => ({
  duration: MOTION_CONFIG.duration.normal,
  delay: index * base,
  ease: MOTION_CONFIG.ease,
});