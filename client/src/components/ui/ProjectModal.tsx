"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { X, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/lib/api";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const locale = useLocale();
  const t = useTranslations("projects");

  // إغلاق بـ ESC ومنع التمرير
  useEffect(() => {
    if (!project) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const title = locale === "ar" ? project.title_ar : project.title_en;
  const description =
    locale === "ar"
      ? project.longDescription_ar || project.description_ar
      : project.longDescription_en || project.description_en;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4
                     bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto
                       rounded-3xl border border-gold-500/20
                       bg-white dark:bg-dark-800 shadow-2xl
                       shadow-gold-500/20"
          >
            {/* زر الإغلاق */}
            <button
              onClick={onClose}
              aria-label={t("close")}
              className="absolute top-4 end-4 z-10 w-10 h-10 rounded-full
                         bg-black/50 backdrop-blur-sm text-white
                         flex items-center justify-center
                         hover:bg-gold-500 hover:text-black
                         transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* الصورة */}
            <div className="relative aspect-video overflow-hidden rounded-t-3xl">
              <img
                src={project.image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <h2 className="absolute bottom-6 start-6 end-6 text-2xl md:text-3xl font-bold text-white pb-2 leading-relaxed">
                {title}
              </h2>
            </div>

            {/* المحتوى */}
            <div className="p-6 md:p-8 space-y-6">
              {/* الوصف */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {description}
              </p>

              {/* التقنيات */}
              <div>
                <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
                  {t("technologies")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm font-medium rounded-full
                                 bg-gold-500/10 text-gold-500 border border-gold-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* الأزرار */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gold-500/10">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2
                               px-6 py-3 rounded-full bg-gold-500 text-black font-semibold
                               hover:bg-gold-400 transition-all duration-300
                               hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t("live_demo")}
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2
                               px-6 py-3 rounded-full border border-gold-500/40
                               text-gold-500 font-semibold
                               hover:bg-gold-500/10 transition-all duration-300"
                  >
                    <FaGithub className="w-4 h-4" />
                    {t("view_code")}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}