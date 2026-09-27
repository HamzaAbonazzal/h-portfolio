"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Download,
  User,
  Mail,
  MapPin,
  Briefcase,
  CheckCircle2,
  BookOpen,
  Zap,
  Users,
} from "lucide-react";
import {
  viewport,
  transitionNormal,
  transitionFast,
  withDelay,
} from "@/lib/motion";

export function About() {
  const t = useTranslations("about");
  const locale = useLocale();

  const features =
    locale === "ar"
      ? [
          {
            title: "تعلم ذاتي",
            desc: "تعلمت البرمجة بنفسي عبر المشاريع العملية",
            icon: BookOpen,
          },
          {
            title: "سرعة التعلم",
            desc: "أتأقلم بسرعة مع التقنيات والأدوات الجديدة",
            icon: Zap,
          },
          {
            title: "حل المشكلات",
            desc: "أتعامل مع التحديات التقنية بحلول إبداعية",
            icon: CheckCircle2,
          },
          {
            title: "العمل الجماعي",
            desc: "أعمل بروح الفريق وأساهم بفعالية في إنجاز المشاريع المشتركة",
            icon: Users,
          },
        ]
      : [
          {
            title: "Self-Taught",
            desc: "Learned programming through hands-on projects",
            icon: BookOpen,
          },
          {
            title: "Fast Learner",
            desc: "Quickly adapt to new technologies and tools",
            icon: Zap,
          },
          {
            title: "Problem Solving",
            desc: "Handle technical challenges with creative solutions",
            icon: CheckCircle2,
          },
          {
            title: "Teamwork",
            desc: "I work collaboratively and contribute effectively to shared projects",
            icon: Users,
          },
        ];

  const infoItems = [
    { icon: User, label: t("info.name"), value: t("info.name_value") },
    { icon: Mail, label: t("info.email"), value: t("info.email_value") },
    {
      icon: MapPin,
      label: t("info.location"),
      value: t("info.location_value"),
    },
    {
      icon: Briefcase,
      label: t("info.experience"),
      value: t("info.experience_value"),
    },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={transitionNormal}
          className="text-center mb-16"
        >
          <p className="text-gold-500 text-sm font-medium tracking-widest uppercase mb-3">
            {t("subtitle")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold pb-3 leading-relaxed">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* النص */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ ...transitionNormal, delay: 0.05 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-gold-500 leading-relaxed">
              {t("heading")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
              {t("paragraph_1")}
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
              {t("paragraph_2")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {infoItems.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 rounded-2xl
                             border border-gold-500/10 bg-white/5 dark:bg-dark-800/40
                             hover:border-gold-500/30 transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-gold-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                         bg-gold-500 text-black font-semibold mt-4
                         hover:bg-gold-400 transition-all duration-300
                         hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              {t("download_cv")}
            </a>
          </motion.div>

          {/* بطاقات الميزات */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ ...transitionNormal, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={withDelay(i, 0.04)}
                  className="group relative p-6 rounded-2xl border border-gold-500/10
                             bg-gradient-to-br from-white/5 to-transparent dark:from-dark-800/60
                             hover:border-gold-500/40 transition-all duration-500
                             hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.3)]"
                >
                  <div
                    className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4
                                group-hover:bg-gold-500/20 transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5 text-gold-500" />
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}