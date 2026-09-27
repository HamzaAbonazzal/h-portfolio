"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, Star } from "lucide-react";
import {
  adminProjectService,
  type Project,
} from "@/lib/api";
import { ProjectFormModal } from "./ProjectFormModal";

interface AdminProjectsProps {
  projects: Project[];
  loading: boolean;
  onRefresh: () => void;
}

export function AdminProjects({ projects, loading, onRefresh }: AdminProjectsProps) {
  const t = useTranslations("admin.dashboard.projects");
  const locale = useLocale();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("confirm_delete"))) return;

    try {
      setDeletingId(id);
      await adminProjectService.delete(id);
      onRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* الرأس */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {t("title")}
        </h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                     bg-gold-500 text-black text-sm font-semibold
                     hover:bg-gold-400 transition-all
                     hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
        >
          <Plus className="w-4 h-4" />
          {t("add_new")}
        </button>
      </div>

      {/* حالة التحميل */}
      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
        </div>
      )}

      {/* لا مشاريع */}
      {!loading && projects.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          {t("no_projects")}
        </div>
      )}

      {/* قائمة المشاريع */}
      {!loading && projects.length > 0 && (
        <div className="grid gap-4">
          <AnimatePresence>
            {projects.map((project, i) => {
              const title = locale === "ar" ? project.title_ar : project.title_en;
              const isDeleting = deletingId === project._id;

              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4
                             rounded-2xl border border-gold-500/10
                             bg-white/50 dark:bg-dark-800/40 backdrop-blur-sm
                             hover:border-gold-500/30 transition-all"
                >
                  {/* الصورة */}
                  <img
                    src={project.image}
                    alt={title}
                    className="w-full md:w-24 h-32 md:h-20 object-cover rounded-xl shrink-0"
                  />

                  {/* المعلومات */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                        {title}
                      </h3>
                      {project.featured && (
                        <Star className="w-4 h-4 text-gold-500 fill-gold-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {project.techStack.slice(0, 5).join(" • ")}
                    </p>
                    <span className="inline-block px-2 py-0.5 text-[10px] font-medium
                                     rounded-md bg-gold-500/10 text-gold-500">
                      {project.category}
                    </span>
                  </div>

                  {/* الأزرار */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(project)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center
                                 border border-gold-500/30 text-gold-500
                                 hover:bg-gold-500/10 transition-all"
                      aria-label={t("edit")}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      disabled={isDeleting}
                      className="w-9 h-9 rounded-lg flex items-center justify-center
                                 border border-red-500/30 text-red-500
                                 hover:bg-red-500/10 transition-all
                                 disabled:opacity-50"
                      aria-label={t("delete")}
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* نافذة إضافة/تعديل */}
      <ProjectFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        project={editingProject}
        onSuccess={() => {
          setModalOpen(false);
          onRefresh();
        }}
      />
    </div>
  );
}