"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Loader2,
  X,
  ImageIcon,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // ✅ رفع الصورة مباشرة إلى Cloudinary
  const uploadToCloudinary = (file: File) => {
    // 1. تحقق من الإعدادات
    if (!cloudName || !uploadPreset) {
      setError("Cloudinary غير مُهيّأ. تأكد من متغيرات البيئة.");
      return;
    }

    // 2. تحقق من نوع الملف
    if (!file.type.startsWith("image/")) {
      setError("الرجاء اختيار ملف صورة (JPG, PNG, WebP)");
      return;
    }

    // 3. تحقق من الحجم (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("حجم الصورة يجب أن يكون أقل من 5MB");
      return;
    }

    // 4. معاينة محلية فورية
    const localUrl = URL.createObjectURL(file);
    setLocalPreview(localUrl);
    setError(null);
    setUploading(true);
    setProgress(0);

    // 5. رفع عبر XMLHttpRequest لدعم Progress
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "portfolio/projects");

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgress(percent);
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);

        // ✅ أضف تحسينات الصورة تلقائياً
        const optimizedUrl = response.secure_url.replace(
          "/upload/",
          "/upload/w_1200,h_675,c_fill,q_auto,f_auto/"
        );

        onChange(optimizedUrl);
        setLocalPreview(null);
        URL.revokeObjectURL(localUrl);
        setUploading(false);
        setProgress(0);
      } else {
        const errResponse = JSON.parse(xhr.responseText || "{}");
        setError(errResponse.error?.message || "فشل رفع الصورة");
        setLocalPreview(null);
        URL.revokeObjectURL(localUrl);
        setUploading(false);
        setProgress(0);
      }
    });

    xhr.addEventListener("error", () => {
      setError("خطأ في الشبكة. حاول مرة أخرى.");
      setLocalPreview(null);
      URL.revokeObjectURL(localUrl);
      setUploading(false);
      setProgress(0);
    });

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    );
    xhr.send(formData);
  };

  // معالجة اختيار الملف
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadToCloudinary(file);
  };

  // معالجة السحب والإفلات
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadToCloudinary(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = () => {
    onChange("");
    setLocalPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRetry = () => {
    setError(null);
    fileInputRef.current?.click();
  };

  // الصورة المعروضة حالياً
  const displayImage = localPreview || value;

  return (
    <div className="space-y-3">
      {/* ✅ إدخال ملف مخفي */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {/* حالة 1: لا صورة → منطقة الرفع */}
        {!displayImage && !uploading && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative p-8 rounded-2xl border-2 border-dashed
                       transition-all duration-300 cursor-pointer
                       flex flex-col items-center justify-center gap-3 min-h-[180px]
                       ${
                         isDragging
                           ? "border-gold-500 bg-gold-500/10 scale-[1.02]"
                           : "border-gold-500/30 bg-gold-500/[0.02] hover:border-gold-500 hover:bg-gold-500/5"
                       }`}
          >
            <div
              className={`w-14 h-14 rounded-full bg-gold-500/10 flex items-center justify-center
                          transition-transform duration-300
                          ${isDragging ? "scale-110" : ""}`}
            >
              <Upload className="w-6 h-6 text-gold-500" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                اسحب الصورة هنا أو اضغط للاختيار
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-500 mt-1">
                JPG, PNG, WebP — الحد الأقصى 5MB
              </p>
            </div>
          </motion.div>
        )}

        {/* حالة 2: رفع جارٍ */}
        {uploading && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative rounded-2xl border-2 border-gold-500/40
                       overflow-hidden bg-black/5 dark:bg-black/20 min-h-[180px]"
          >
            {/* معاينة الصورة */}
            {localPreview && (
              <img
                src={localPreview}
                alt="Uploading"
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
              />
            )}

            {/* طبقة التحميل */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-4
                            min-h-[180px] p-6">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-gold-500 animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center
                                 text-[10px] font-bold text-gold-500">
                  {progress}%
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                جاري رفع الصورة... {progress}%
              </p>

              {/* شريط التقدم */}
              <div className="w-full max-w-xs h-1.5 rounded-full bg-gray-200 dark:bg-dark-700 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600
                             shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* حالة 3: صورة مرفوعة */}
        {displayImage && !uploading && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative rounded-2xl border-2 border-gold-500/30
                       overflow-hidden group"
          >
            {/* الصورة */}
            <img
              src={displayImage}
              alt="Preview"
              className="w-full h-48 object-cover"
            />

            {/* طبقة تحكم */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-11 h-11 rounded-full bg-gold-500 text-black
                           flex items-center justify-center
                           hover:scale-110 transition-transform duration-300
                           shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                title="تغيير الصورة"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="w-11 h-11 rounded-full bg-red-500 text-white
                           flex items-center justify-center
                           hover:scale-110 transition-transform duration-300
                           shadow-[0_0_20px_rgba(239,68,68,0.6)]"
                title="حذف الصورة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* شارة النجاح */}
            <div className="absolute top-3 start-3 flex items-center gap-1.5
                            px-3 py-1.5 rounded-full
                            bg-emerald-500 text-white text-[11px] font-bold
                            shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              <CheckCircle2 className="w-3 h-3" />
              تم الرفع بنجاح
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* حالة 4: خطأ */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between gap-3 p-3 rounded-xl
                       bg-red-500/10 border border-red-500/30
                       text-red-500 text-xs"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              className="text-red-500 font-bold hover:underline shrink-0"
            >
              حاول مجدداً
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* حقل الرابط اليدوي (اختياري - للمرونة) */}
      <div className="relative">
        <ImageIcon className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-gold-500/40 pointer-events-none" />
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="أو ألصق رابط صورة مباشر"
          className="w-full ps-11 pe-4 py-2.5 rounded-xl
                     bg-white/50 dark:bg-dark-800/50
                     border border-gold-500/10 focus:border-gold-500/40
                     focus:outline-none text-gray-700 dark:text-gray-300
                     text-xs placeholder-gray-400 transition-all duration-300"
        />
      </div>
    </div>
  );
}