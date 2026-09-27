"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Zap,
  Database,
  Layers,
  Shield,
  Send,
  FileCode2,
  Palette,
  Smartphone,
  Workflow,
  Lock,
} from "lucide-react";
import { viewport, transitionNormal, MOTION_CONFIG } from "@/lib/motion";

export function Skills() {
  const t = useTranslations("skills");

  const skillCategories = [
    {
      key: "frontend",
      icon: Code2,
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-cyan-400",
      skills: [
        { name: t("list.react"), icon: Layers, level: 95 },
        { name: t("list.typescript"), icon: FileCode2, level: 75 },
        { name: t("list.tailwind"), icon: Palette, level: 85 },
        { name: t("list.bootstrap"), icon: Smartphone, level: 85 },
        { name: t("list.framer"), icon: Zap, level: 70 },
        { name: t("list.redux"), icon: Workflow, level: 85 },
        { name: t("list.responsive"), icon: Smartphone, level: 95 },
      ],
    },
    {
      key: "backend",
      icon: Server,
      color: "from-emerald-500/20 to-green-500/20",
      iconColor: "text-emerald-400",
      skills: [
        { name: t("list.node"), icon: Server, level: 90 },
        { name: t("list.mongodb"), icon: Database, level: 85 },
        { name: t("list.mysql"), icon: Database, level: 75 },
        { name: t("list.rest"), icon: Send, level: 90 },
        { name: t("list.auth"), icon: Shield, level: 85 },
        { name: t("list.validation"), icon: FileCode2, level: 90 },
        { name: t("list.security"), icon: Lock, level: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

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

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skillCategories.map((category, catIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{
                  duration: MOTION_CONFIG.duration.normal,
                  delay: catIndex * 0.08,
                  ease: MOTION_CONFIG.ease,
                }}
                className="group relative p-6 md:p-8 rounded-3xl
                           border border-gold-500/10
                           bg-white/50 dark:bg-dark-800/40 backdrop-blur-sm
                           hover:border-gold-500/40
                           transition-all duration-500
                           hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.3)]"
              >
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${category.color}
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500
                              pointer-events-none`}
                />

                <div className="relative flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20
                                  flex items-center justify-center
                                  group-hover:scale-110 transition-transform duration-300">
                    <CategoryIcon className="w-7 h-7 text-gold-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    {t(`categories.${category.key}`)}
                  </h3>
                </div>

                <div className="relative space-y-5">
                  {category.skills.map((skill, i) => {
                    const SkillIcon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewport}
                        transition={{
                          duration: MOTION_CONFIG.duration.fast,
                          delay: i * 0.04,
                          ease: MOTION_CONFIG.ease,
                        }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <SkillIcon className={`w-4 h-4 ${category.iconColor}`} />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-xs text-gold-500 font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-200/50 dark:bg-dark-700 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={viewport}
                            transition={{
                              duration: 0.7,
                              delay: 0.1 + i * 0.05,
                              ease: MOTION_CONFIG.ease,
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600
                                       shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}