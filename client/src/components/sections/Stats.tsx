"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Briefcase, Award, Code2, Clock } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { viewport, transitionNormal, MOTION_CONFIG } from "@/lib/motion";

export function Stats() {
  const t = useTranslations("stats");

  const stats = [
    {
      icon: Code2,
      value: 15,
      suffix: "+",
      label: t("projects"),
      color: "text-cyan-400",
      bgColor: "from-cyan-500/10 to-blue-500/10",
    },
    {
      icon: Briefcase,
      value: 2,
      suffix: "",
      label: t("experience"),
      color: "text-gold-500",
      bgColor: "from-gold-500/10 to-yellow-500/10",
    },
    {
      icon: Clock,
      value: 1000,
      suffix: "+",
      label: t("coding_hours"),
      color: "text-emerald-400",
      bgColor: "from-emerald-500/10 to-green-500/10",
    },
    {
      icon: Award,
      value: 18,
      suffix: "+",
      label: t("technologies"),
      color: "text-purple-400",
      bgColor: "from-purple-500/10 to-pink-500/10",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />

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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={viewport}
                transition={{
                  duration: MOTION_CONFIG.duration.normal,
                  delay: i * 0.07,
                  ease: MOTION_CONFIG.ease,
                }}
                whileHover={{
                  y: -6,
                  transition: {
                    duration: MOTION_CONFIG.hover.duration,
                    ease: MOTION_CONFIG.ease,
                  },
                }}
                className="group relative p-6 rounded-3xl
                           border border-gold-500/10
                           bg-white/50 dark:bg-dark-800/40 backdrop-blur-sm
                           hover:border-gold-500/40
                           transition-all duration-500
                           hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.4)]
                           text-center"
              >
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.bgColor}
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500
                              pointer-events-none`}
                />

                <div className="relative flex justify-center mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center
                               bg-gradient-to-br ${stat.bgColor}
                               border border-gold-500/20
                               group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                </div>

                <div className="relative mb-2">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r
                               from-gold-300 via-gold-500 to-gold-600
                               bg-clip-text text-transparent pb-2 leading-relaxed
                               inline-block"
                  />
                </div>

                <p className="relative text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}