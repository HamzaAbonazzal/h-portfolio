"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  FileText,
  MessageSquare,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { messageService } from "@/lib/api";
import { viewport, transitionNormal, MOTION_CONFIG } from "@/lib/motion";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const t = useTranslations("contact");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const socials = [
    {
      icon: FaGithub,
      href: "https://github.com/hamzaabonazzal",
      label: "GitHub",
      color: "hover:text-gray-800 dark:hover:text-white",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/hamza-abonazzal",
      label: "LinkedIn",
      color: "hover:text-blue-500",
    },
    {
      icon: FaTwitter,
      href: "https://x.com/HamzaAbonazzal",
      label: "Twitter",
      color: "hover:text-sky-500",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/963986751916",
      label: "WhatsApp",
      color: "hover:text-green-500",
    },
  ];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("validation.name_required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("validation.email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("validation.email_invalid");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("validation.message_required");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("validation.message_short");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("loading");

    try {
      await messageService.send(formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputBaseClass =
    "w-full ps-11 pe-4 py-3 rounded-2xl bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm " +
    "border border-gold-500/20 focus:border-gold-500 focus:outline-none " +
    "text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 " +
    "transition-all duration-300 focus:shadow-[0_0_25px_rgba(212,175,55,0.15)]";

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[130px] pointer-events-none" />

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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* معلومات التواصل */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={transitionNormal}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 leading-relaxed mb-4">
                {t("heading")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                {t("description")}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:hamzaabonazzal@gmail.com"
                className="group flex items-center gap-4 p-5 rounded-2xl
                           border border-gold-500/10 bg-white/50 dark:bg-dark-800/40 backdrop-blur-sm
                           hover:border-gold-500/40 transition-all duration-300
                           hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.4)]"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center
                                group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-gold-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                    {t("email_label")}
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                    hamzaabonazzal@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 rounded-2xl
                              border border-gold-500/10 bg-white/50 dark:bg-dark-800/40 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                    {t("location_label")}
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {t("location_value")}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-4">
                {t("follow_me")}
              </p>
              <div className="flex flex-wrap gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-12 h-12 flex items-center justify-center rounded-full
                               border border-gold-500/20 text-gray-500 dark:text-gray-400
                               hover:border-gold-500 ${color}
                               hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
                               hover:-translate-y-1 transition-all duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* النموذج */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ ...transitionNormal, delay: 0.1 }}
            className="relative p-6 md:p-8 rounded-3xl
                       border border-gold-500/20
                       bg-white/50 dark:bg-dark-800/40 backdrop-blur-xl
                       shadow-[0_20px_60px_-15px_rgba(212,175,55,0.2)]"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">
              {t("form_title")}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <div className="relative">
                  <User className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-gold-500/60" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("name_placeholder")}
                    aria-label={t("name")}
                    className={inputBaseClass}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Mail className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-gold-500/60" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("email_placeholder")}
                    aria-label={t("email")}
                    className={inputBaseClass}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <FileText className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-gold-500/60" />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t("subject_placeholder")}
                  aria-label={t("subject")}
                  className={inputBaseClass}
                />
              </div>

              <div>
                <div className="relative">
                  <MessageSquare className="absolute top-4 start-4 w-4 h-4 text-gold-500/60" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("message_placeholder")}
                    aria-label={t("message")}
                    rows={4}
                    className={`${inputBaseClass} resize-none pt-3`}
                  />
                </div>
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-2
                           px-8 py-3.5 rounded-2xl bg-gold-500 text-black font-semibold
                           hover:bg-gold-400 transition-all duration-300
                           hover:shadow-[0_0_35px_rgba(212,175,55,0.6)]
                           disabled:opacity-60 disabled:cursor-not-allowed
                           disabled:hover:shadow-none"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("sending")}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t("send")}
                  </>
                )}
              </button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl
                             bg-emerald-500/10 border border-emerald-500/30
                             text-emerald-500 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  {t("success")}
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl
                             bg-red-500/10 border border-red-500/30
                             text-red-500 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {t("error")}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}