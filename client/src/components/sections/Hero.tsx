"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Download, Mail, MapPin, Code2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { TypingEffect } from "@/components/ui/TypingEffect";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  // ✅ الأدوار محدثة: إضافة Next.js وقواعد البيانات
  const roles =
    locale === "ar"
      ? [
          "مطور فل ستاك",
          "متخصص React و Next.js",
          "مطور Node.js",
          "خبير قواعد البيانات",
        ]
      : [
          "Full Stack Developer",
          "React & Next.js Developer",
          "Node.js Developer",
          "Database Enthusiast",
        ];

  const socials = [
    {
      icon: FaGithub,
      href: "https://github.com/yourusername",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com/yourusername",
      label: "Twitter",
    },
  ];

  const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,      // ⚡ أسرع من 0.12
      delayChildren: 0.05,         // ⚡ أسرع من 0.2
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },   // 20 بدل 25
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,               // ⚡ أسرع من 0.6
      ease: [0.22, 1, 0.36, 1],    // ✨ نعومة احترافية
    },
  },
} as const;

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden"
    >
      <ParticlesBackground />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 text-center lg:text-start"
          >
            <motion.div variants={itemVariants}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           bg-gold-500/10 border border-gold-500/30
                           text-xs font-medium text-gold-500 tracking-wide"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500" />
                </span>
                {t("available")}
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-gold-500 font-medium tracking-widest text-sm uppercase"
            >
              {t("greeting")}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold
                         bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600
                         bg-clip-text text-transparent pb-4 leading-[1.2]"
            >
              {t("name")}
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-light min-h-[2.5rem]"
            >
              <TypingEffect
                words={roles}
                className="text-gold-500 font-medium"
              />
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 justify-center lg:justify-start text-sm text-gray-500 dark:text-gray-400"
            >
              <MapPin className="w-4 h-4 text-gold-500" />
              {t("based_in")}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5
                           rounded-full bg-gold-500 text-black font-semibold
                           hover:bg-gold-400 transition-all duration-300
                           hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                {t("cta_contact")}
              </a>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5
                           rounded-full border border-gold-500/40 text-gold-500 font-semibold
                           hover:bg-gold-500/10 hover:border-gold-500
                           transition-all duration-300 hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                {t("cta_cv")}
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-3 pt-4 justify-center lg:justify-start"
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full
                             border border-gold-500/20 text-gray-500 dark:text-gray-400
                             hover:border-gold-500 hover:text-gold-500
                             hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
                             hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-gold-500/30"
              />

              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-600/20 blur-xl" />

              <div
                className="absolute inset-6 rounded-full overflow-hidden border-2 border-gold-500/50
                shadow-[0_0_60px_rgba(212,175,55,0.4)] group"
              >
                {/* صورة المستخدم - تظهر إذا وُجدت */}
                <img
                  src="/profile.jpg"
                  alt="Hamza Abonazzal"
                  className="w-full h-full object-cover relative z-20"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />

                {/* Fallback: يظهر إذا لم توجد الصورة */}
                <div
                  className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden
                  bg-gradient-to-br from-gold-100 via-gold-50 to-white
                  dark:from-dark-700 dark:via-dark-800 dark:to-dark-900"
                >
                  {/* شبكة خفيفة في الخلفية */}
                  <div
                    className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                      color: "#d4af37",
                    }}
                  />

                  {/* توهج ذهبي مركزي */}
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.25),transparent_70%)]
                    dark:bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2),transparent_70%)]"
                  />

                  {/* رموز برمجية متطايرة */}
                  <motion.span
                    animate={{ y: [-6, 6, -6], opacity: [0.4, 0.8, 0.4] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-[18%] left-[20%] text-2xl font-mono font-bold text-gold-500/50 select-none"
                  >
                    {"<"}
                  </motion.span>
                  <motion.span
                    animate={{ y: [6, -6, 6], opacity: [0.4, 0.8, 0.4] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-[20%] right-[22%] text-2xl font-mono font-bold text-gold-500/50 select-none"
                  >
                    {"/>"}
                  </motion.span>
                  <motion.span
                    animate={{ y: [-5, 5, -5], opacity: [0.3, 0.7, 0.3] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-[22%] left-[18%] text-xl font-mono font-bold text-gold-500/50 select-none"
                  >
                    {"{ }"}
                  </motion.span>
                  <motion.span
                    animate={{ y: [5, -5, 5], opacity: [0.3, 0.7, 0.3] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-[25%] right-[20%] text-xl font-mono font-bold text-gold-500/50 select-none"
                  >
                    {";"}
                  </motion.span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-[45%] left-[10%] text-lg font-mono font-bold text-gold-500/40 select-none"
                  >
                    {"#"}
                  </motion.span>
                  <motion.span
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-[50%] right-[12%] text-lg font-mono font-bold text-gold-500/40 select-none"
                  >
                    {"( )"}
                  </motion.span>

                  {/* الأيقونة المركزية: </> */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative flex items-center justify-center"
                  >
                    <Code2 className="w-24 h-24 md:w-28 md:h-28 text-gold-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                  </motion.div>
                </div>
              </div>

              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-2 -end-2 px-4 py-2 rounded-2xl
                           bg-gold-500 text-black font-bold text-sm
                           shadow-[0_0_25px_rgba(212,175,55,0.6)]"
              >
                Full Stack
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator label={t("scroll_down")} />
    </section>
  );
}
