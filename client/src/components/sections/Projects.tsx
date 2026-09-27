"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, FolderOpen } from "lucide-react";
import { projectService, type Project } from "@/lib/api";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";

type Filter = "all" | "fullstack" | "frontend" | "backend" | "web";

export function Projects() {
  const t = useTranslations("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // جلب المشاريع من الـ API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectService.getAll();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // الفلاتر
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t("filter_all") },
    { id: "fullstack", label: t("filter_fullstack") },
    { id: "frontend", label: t("filter_frontend") },
    { id: "web", label: t("filter_web") },
  ];

  // المشاريع المفلترة
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* توهج خلفي */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
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

        {/* الفلاتر */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {filters.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium
                           transition-all duration-300
                           ${
                             isActive
                               ? "text-black"
                               : "text-gray-600 dark:text-gray-400 border border-gold-500/20 hover:border-gold-500/50 hover:text-gold-500"
                           }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-400 to-gold-500
                               shadow-[0_0_25px_rgba(212,175,55,0.6)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* حالة التحميل */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
            <p className="text-gray-500 dark:text-gray-400">{t("loading")}</p>
          </div>
        )}

        {/* حالة الخطأ */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            {/* <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
              <FolderOpen className="w-8 h-8 text-red-500" />
            </div> */}
            {/* <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              {t("error")}
            </p> */}
            <p className="text-xs text-gray-400">
              لا يوجد مشاريع مضافة بعد
            </p>
          </div>
        )}

        {/* حالة عدم وجود مشاريع */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center">
              <FolderOpen className="w-8 h-8 text-gold-500" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              {t("no_projects")}
            </p>
          </div>
        )}

        {/* شبكة المشاريع */}
        {!loading && !error && filteredProjects.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={i}
                  onView={setSelectedProject}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* نافذة التفاصيل */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}