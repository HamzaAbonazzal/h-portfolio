"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/lib/api";
import { viewport, MOTION_CONFIG } from "@/lib/motion";

interface ProjectCardProps {
  project: Project;
  index: number;
  onView: (project: Project) => void;
}

export function ProjectCard({ project, index, onView }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations("projects");

  const title = locale === "ar" ? project.title_ar : project.title_en;
  const description =
    locale === "ar" ? project.description_ar : project.description_en;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration: MOTION_CONFIG.duration.normal,
        delay: index * 0.05,
        ease: MOTION_CONFIG.ease,
      }}
      whileHover={{
        y: -8,
        transition: {
          duration: MOTION_CONFIG.hover.duration,
          ease: MOTION_CONFIG.ease,
        },
      }}
      className="group relative rounded-3xl overflow-hidden
                 border border-gold-500/10
                 bg-white/50 dark:bg-dark-800/40 backdrop-blur-sm
                 hover:border-gold-500/50
                 transition-all duration-500
                 hover:shadow-[0_25px_60px_-15px_rgba(212,175,55,0.4)]"
    >
      {/* صورة المشروع */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700
                     group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                        opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {project.featured && (
          <div className="absolute top-4 start-4 px-3 py-1 rounded-full
                          bg-gold-500 text-black text-xs font-bold
                          shadow-[0_0_20px_rgba(212,175,55,0.6)]">
            ⭐ Featured
          </div>
        )}

        <div className="absolute top-4 end-4 w-10 h-10 rounded-full
                        bg-gold-500 text-black flex items-center justify-center
                        translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-500 cursor-pointer">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      {/* محتوى البطاقة */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100
                       group-hover:text-gold-500 transition-colors duration-300
                       line-clamp-1">
          {title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed
                      line-clamp-2 min-h-[2.5rem]">
          {description}
        </p>

        {/* التقنيات */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-medium rounded-md
                         bg-gold-500/10 text-gold-500 border border-gold-500/20"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2.5 py-1 text-[11px] font-medium rounded-md
                             bg-gray-500/10 text-gray-500 dark:text-gray-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* الأزرار */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => onView(project)}
            className="flex-1 px-4 py-2.5 rounded-full
                       bg-gold-500 text-black text-sm font-semibold
                       hover:bg-gold-400 transition-all duration-300
                       hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]"
          >
            {t("view_project")}
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full flex items-center justify-center
                         border border-gold-500/30 text-gray-500 dark:text-gray-400
                         hover:border-gold-500 hover:text-gold-500
                         transition-all duration-300"
            >
              <FaGithub className="w-4 h-4" />
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live Demo"
              className="w-10 h-10 rounded-full flex items-center justify-center
                         border border-gold-500/30 text-gray-500 dark:text-gray-400
                         hover:border-gold-500 hover:text-gold-500
                         transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}