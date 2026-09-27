"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  Save,
  Upload,
  ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { adminProjectService, type Project } from "@/lib/api";
import { ImageUploader } from "./ImageUploader";

interface ProjectFormModalProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
  onSuccess: () => void;
}

const emptyForm = {
  title_en: "",
  title_ar: "",
  description_en: "",
  description_ar: "",
  longDescription_en: "",
  longDescription_ar: "",
  image: "",
  techStack: "",
  category: "fullstack",
  githubUrl: "",
  liveUrl: "",
  featured: false,
};

// ✅ نوع widget الخاص بـ Cloudinary
declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (
          error: unknown,
          result: { event: string; info: { secure_url: string } },
        ) => void,
      ) => { open: () => void };
    };
  }
}

export function ProjectFormModal({
  open,
  onClose,
  project,
  onSuccess,
}: ProjectFormModalProps) {
  const t = useTranslations("admin.dashboard.form");
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // تحميل بيانات المشروع عند التعديل
  useEffect(() => {
    if (project) {
      setForm({
        title_en: project.title_en,
        title_ar: project.title_ar,
        description_en: project.description_en,
        description_ar: project.description_ar,
        longDescription_en: project.longDescription_en || "",
        longDescription_ar: project.longDescription_ar || "",
        image: project.image,
        techStack: project.techStack.join(", "),
        category: project.category,
        githubUrl: project.githubUrl || "",
        liveUrl: project.liveUrl || "",
        featured: project.featured || false,
      });
    } else {
      setForm(emptyForm);
    }
  }, [project, open]);

  // منع التمرير عند فتح النافذة
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ رفع الصورة عبر Cloudinary Widget
  const handleImageUpload = () => {
    if (!window.cloudinary) {
      alert(
        "Cloudinary widget is still loading. Please try again in a moment.",
      );
      return;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert(
        "Cloudinary is not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local",
      );
      return;
    }

    setUploading(true);

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        folder: "portfolio/projects",
        sources: ["local", "url", "camera"],
        multiple: false,
        maxFileSize: 5000000, // 5MB
        cropping: true,
        croppingAspectRatio: 16 / 9,
        showSkipCropButton: false,
        croppingShowDimensions: true,
        resourceType: "image",
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
        language: "en",
        text: {
          en: {
            or: "or",
            local: {
              browse: "Browse",
              dd_title_single: "Drag and drop an image here",
            },
          },
        },
      },
      (error, result) => {
        setUploading(false);

        if (!error && result && result.event === "success") {
          // ✅ ضع الرابط المُحسّن مباشرة
          const optimizedUrl = result.info.secure_url.replace(
            "/upload/",
            "/upload/w_1200,h_675,c_fill,q_auto,f_auto/",
          );
          setForm((prev) => ({ ...prev, image: optimizedUrl }));
        }
      },
    );

    widget.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        techStack: form.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (project) {
        await adminProjectService.update(project._id, payload);
      } else {
        await adminProjectService.create(payload);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-dark-800/50 " +
    "border border-gold-500/20 focus:border-gold-500 focus:outline-none " +
    "text-gray-800 dark:text-gray-100 text-sm placeholder-gray-400 " +
    "transition-all duration-300";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4
                     bg-black/70 backdrop-blur-sm overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl my-8 rounded-3xl
                       border border-gold-500/20
                       bg-white dark:bg-dark-800 shadow-2xl shadow-gold-500/20"
          >
            {/* الرأس */}
            <div className="flex items-center justify-between p-6 border-b border-gold-500/10">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 pb-1 leading-relaxed">
                {project ? t("edit_title") : t("add_title")}
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center
                           border border-gold-500/30 text-gold-500
                           hover:bg-gold-500/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* النموذج */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
            >
              {/* العناوين */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                    {t("title_en")}
                  </label>
                  <input
                    type="text"
                    name="title_en"
                    value={form.title_en}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                    {t("title_ar")}
                  </label>
                  <input
                    type="text"
                    name="title_ar"
                    value={form.title_ar}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    dir="rtl"
                  />
                </div>
              </div>

              {/* الأوصاف القصيرة */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                    {t("description_en")}
                  </label>
                  <textarea
                    name="description_en"
                    value={form.description_en}
                    onChange={handleChange}
                    required
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                    {t("description_ar")}
                  </label>
                  <textarea
                    name="description_ar"
                    value={form.description_ar}
                    onChange={handleChange}
                    required
                    rows={3}
                    className={`${inputClass} resize-none`}
                    dir="rtl"
                  />
                </div>
              </div>

              {/* الأوصاف الطويلة */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                    {t("long_description_en")}
                  </label>
                  <textarea
                    name="longDescription_en"
                    value={form.longDescription_en}
                    onChange={handleChange}
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                    {t("long_description_ar")}
                  </label>
                  <textarea
                    name="longDescription_ar"
                    value={form.longDescription_ar}
                    onChange={handleChange}
                    rows={3}
                    className={`${inputClass} resize-none`}
                    dir="rtl"
                  />
                </div>
              </div>

              {/* ═══════════════════════════════════════ */}
              {/* 🖼️ الصورة - مع رفع تلقائي */}
              {/* ═══════════════════════════════════════ */}
              <div>
                <label className="block text-xs font-bold text-gold-500 uppercase tracking-wider mb-3">
                  {t("image")}
                </label>
                <ImageUploader
                  value={form.image}
                  onChange={(url) =>
                    setForm((prev) => ({ ...prev, image: url }))
                  }
                />
              </div>

              {/* التقنيات */}
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  {t("tech_stack")}
                </label>
                <input
                  type="text"
                  name="techStack"
                  value={form.techStack}
                  onChange={handleChange}
                  required
                  placeholder="React, Next.js, Node.js, MongoDB"
                  className={inputClass}
                />
              </div>

              {/* التصنيف */}
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  {t("category")}
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="frontend">{t("categories.frontend")}</option>
                  <option value="backend">{t("categories.backend")}</option>
                  <option value="fullstack">{t("categories.fullstack")}</option>
                  <option value="web">{t("categories.web")}</option>
                </select>
              </div>

              {/* الروابط */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                    {t("github_url")}
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={form.githubUrl}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                    {t("live_url")}
                  </label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={form.liveUrl}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Featured */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-4 h-4 accent-gold-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t("featured")}
                </span>
              </label>

              {/* الأزرار */}
              <div className="flex gap-3 pt-4 border-t border-gold-500/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-xl border border-gold-500/30
                             text-gold-500 font-semibold hover:bg-gold-500/10
                             transition-all"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-2
                             px-6 py-3 rounded-xl bg-gold-500 text-black font-semibold
                             hover:bg-gold-400 transition-all
                             hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]
                             disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("saving")}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {t("save")}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
