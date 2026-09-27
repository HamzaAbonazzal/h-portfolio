"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiAxios,
  SiSocketdotio,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiFramer,
  SiRedux,
  SiHtml5,
  SiCss,
  SiSass,
  SiBootstrap,
  SiJquery,
  SiMysql,
  SiJsonwebtokens,
  SiReactrouter,
  SiGit,
  SiGithub,
  SiVercel,
  SiPostman,
  SiEslint,
  SiPrettier,
  SiNpm,
  SiGooglechrome,
  SiNodemon,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Code2, Wrench, Terminal } from "lucide-react";
import { viewport, transitionNormal, MOTION_CONFIG } from "@/lib/motion";

type Tab = "technologies" | "tools";

export function Technologies() {
  const t = useTranslations("technologies");
  const [activeTab, setActiveTab] = useState<Tab>("technologies");

  const coreTechnologies = [
    { name: "React", icon: SiReact, color: "text-cyan-400" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-black dark:text-white" },
    { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
    { name: "MySQL", icon: SiMysql, color: "text-blue-500" },
    { name: "Express", icon: SiExpress, color: "text-gray-700 dark:text-gray-300" },
  ];

  const additionalTechnologies = [
    { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
    { name: "Axios", icon: SiAxios, color: "text-purple-500" },
    { name: "Socket.io", icon: SiSocketdotio, color: "text-gray-800 dark:text-white" },
    { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400" },
    { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
    { name: "CSS3", icon: SiCss, color: "text-blue-500" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
    { name: "Redux", icon: SiRedux, color: "text-purple-500" },
    { name: "Sass", icon: SiSass, color: "text-pink-500" },
    { name: "Bootstrap", icon: SiBootstrap, color: "text-purple-600" },
    { name: "jQuery", icon: SiJquery, color: "text-blue-400" },
    { name: "Mongoose", icon: SiMongoose, color: "text-red-500" },
    { name: "React Router", icon: SiReactrouter, color: "text-red-500" },
    { name: "Framer Motion", icon: SiFramer, color: "text-pink-500" },
    { name: "JWT", icon: SiJsonwebtokens, color: "text-pink-500" },
  ];

  const toolsList = [
    { name: "VS Code", icon: VscVscode, color: "text-blue-500" },
    { name: "Chrome DevTools", icon: SiGooglechrome, color: "text-yellow-500" },
    { name: "Git", icon: SiGit, color: "text-orange-500" },
    { name: "GitHub", icon: SiGithub, color: "text-gray-800 dark:text-white" },
    { name: "Postman", icon: SiPostman, color: "text-orange-500" },
    { name: "MongoDB Compass", icon: SiMongodb, color: "text-green-500" },
    { name: "MongoDB Atlas", icon: SiMongodb, color: "text-emerald-400" },
    { name: "MySQL Workbench", icon: SiMysql, color: "text-blue-500" },
    { name: "npm", icon: SiNpm, color: "text-red-500" },
    { name: "Terminal", icon: Terminal, color: "text-emerald-400" },
    { name: "Nodemon", icon: SiNodemon, color: "text-green-500" },
    { name: "Vercel", icon: SiVercel, color: "text-black dark:text-white" },
    { name: "ESLint", icon: SiEslint, color: "text-purple-500" },
    { name: "Prettier", icon: SiPrettier, color: "text-yellow-500" },
  ];

  const tabs = [
    { id: "technologies" as Tab, label: t("tab_technologies"), icon: Code2 },
    { id: "tools" as Tab, label: t("tab_tools"), icon: Wrench },
  ];

  return (
    <section id="technologies" className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={transitionNormal}
          className="text-center mb-12"
        >
          <p className="text-gold-500 text-sm font-medium tracking-widest uppercase mb-3">
            {t("subtitle")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold pb-3 leading-relaxed">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
          <p className="text-gray-500 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* أزرار التبديل */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ ...transitionNormal, delay: 0.05 }}
          className="flex justify-center mb-12"
        >
          <div className="relative inline-flex items-center gap-2 p-1.5 rounded-full
                          border border-gold-500/20 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full
                             text-sm font-semibold transition-colors duration-300 z-10
                             ${
                               isActive
                                 ? "text-black dark:text-black"
                                 : "text-gray-600 dark:text-gray-400 hover:text-gold-500"
                             }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-400 to-gold-500
                                 shadow-[0_0_25px_rgba(212,175,55,0.6)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* المحتوى */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "technologies" ? (
              <motion.div
                key="technologies"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={transitionNormal}
                className="space-y-14"
              >
                {/* ⭐ التقنيات الأساسية */}
                <div>
                  <h3 className="text-center text-sm font-bold text-gold-500 uppercase tracking-widest mb-8">
                    ⭐ Core Stack
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                    {coreTechnologies.map((tech, i) => {
                      const Icon = tech.icon;
                      return (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.9, y: 15 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={viewport}
                          transition={{
                            duration: MOTION_CONFIG.duration.fast,
                            delay: i * 0.035,
                            ease: MOTION_CONFIG.ease,
                          }}
                          whileHover={{
                            y: -8,
                            scale: 1.05,
                            transition: {
                              duration: MOTION_CONFIG.hover.duration,
                              ease: MOTION_CONFIG.ease,
                            },
                          }}
                          className="group relative p-5 md:p-6 rounded-3xl
                                     border-2 border-gold-500/20
                                     bg-gradient-to-br from-gold-500/5 to-transparent
                                     dark:from-gold-500/10 dark:to-transparent
                                     backdrop-blur-sm
                                     hover:border-gold-500/60
                                     transition-all duration-300 cursor-pointer
                                     hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.5)]"
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center
                                            group-hover:scale-110 transition-transform duration-300">
                              <Icon className={`w-12 h-12 md:w-14 md:h-14 ${tech.color}`} />
                            </div>
                            <p className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-100 text-center">
                              {tech.name}
                            </p>
                          </div>
                          <div className="absolute inset-x-5 bottom-0 h-px
                                          bg-gradient-to-r from-transparent via-gold-500 to-transparent
                                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* 📦 التقنيات الإضافية */}
                <div>
                  <h3 className="text-center text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-8">
                    Also Experienced With
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
                    {additionalTechnologies.map((tech, i) => {
                      const Icon = tech.icon;
                      return (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.85, y: 12 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={viewport}
                          transition={{
                            duration: MOTION_CONFIG.duration.fast,
                            delay: 0.15 + i * 0.02,
                            ease: MOTION_CONFIG.ease,
                          }}
                          whileHover={{
                            y: -5,
                            transition: {
                              duration: MOTION_CONFIG.hover.duration,
                              ease: MOTION_CONFIG.ease,
                            },
                          }}
                          className="group relative p-3.5 md:p-4 rounded-2xl
                                     border border-gold-500/10
                                     bg-white/50 dark:bg-dark-800/40 backdrop-blur-sm
                                     hover:border-gold-500/40
                                     transition-all duration-300 cursor-pointer
                                     hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.4)]"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center
                                            group-hover:scale-110 transition-transform duration-300">
                              <Icon className={`w-8 h-8 md:w-9 md:h-9 ${tech.color}`} />
                            </div>
                            <p className="text-[10px] md:text-xs font-medium text-gray-600 dark:text-gray-400 text-center leading-tight">
                              {tech.name}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="tools"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={transitionNormal}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
                  {toolsList.map((tool, i) => {
                    const Icon = tool.icon;
                    return (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, scale: 0.85, y: 12 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={viewport}
                        transition={{
                          duration: MOTION_CONFIG.duration.fast,
                          delay: i * 0.03,
                          ease: MOTION_CONFIG.ease,
                        }}
                        whileHover={{
                          y: -6,
                          transition: {
                            duration: MOTION_CONFIG.hover.duration,
                            ease: MOTION_CONFIG.ease,
                          },
                        }}
                        className="group relative p-4 md:p-5 rounded-2xl
                                   border border-gold-500/10
                                   bg-white/50 dark:bg-dark-800/40 backdrop-blur-sm
                                   hover:border-gold-500/50
                                   transition-all duration-300 cursor-pointer
                                   hover:shadow-[0_15px_40px_-10px_rgba(212,175,55,0.4)]"
                      >
                        <div className="flex flex-col items-center gap-2.5">
                          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
                                          group-hover:scale-110 transition-transform duration-300">
                            <Icon className={`w-9 h-9 md:w-10 md:h-10 ${tool.color}`} />
                          </div>
                          <p className="text-[10px] md:text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                            {tool.name}
                          </p>
                        </div>
                        <div className="absolute inset-x-3 bottom-0 h-px
                                        bg-gradient-to-r from-transparent via-gold-500 to-transparent
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}