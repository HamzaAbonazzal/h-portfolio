"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { authService } from "@/lib/api";
import { useAuth } from "@/components/providers/AuthProvider";

export default function AdminLoginPage() {
  const t = useTranslations("admin.login");
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authService.login(email, password);
      login(data.token, {
        _id: data._id,
        name: data.name,
        email: data.email,
      });
      router.push("/admin");
    } catch (err: any) {
      console.error(err);
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* خلفية مزخرفة */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* زر العودة */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400
                     hover:text-gold-500 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("back_to_site")}
        </Link>

        {/* البطاقة */}
        <div className="p-8 rounded-3xl border border-gold-500/20
                        bg-white/50 dark:bg-dark-800/40 backdrop-blur-xl
                        shadow-[0_20px_60px_-15px_rgba(212,175,55,0.3)]">
          {/* الرأس */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl
                            bg-gold-500/10 border border-gold-500/30 mb-4">
              <Lock className="w-7 h-7 text-gold-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 pb-2 leading-relaxed">
              {t("title")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {t("subtitle")}
            </p>
          </div>

          {/* النموذج */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("email")}
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-gold-500/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("email_placeholder")}
                  required
                  className="w-full ps-11 pe-4 py-3 rounded-2xl bg-white/50 dark:bg-dark-800/50
                             border border-gold-500/20 focus:border-gold-500 focus:outline-none
                             text-gray-800 dark:text-gray-100 placeholder-gray-400
                             transition-all duration-300 focus:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("password")}
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-gold-500/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("password_placeholder")}
                  required
                  className="w-full ps-11 pe-4 py-3 rounded-2xl bg-white/50 dark:bg-dark-800/50
                             border border-gold-500/20 focus:border-gold-500 focus:outline-none
                             text-gray-800 dark:text-gray-100 placeholder-gray-400
                             transition-all duration-300 focus:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl
                           bg-red-500/10 border border-red-500/30
                           text-red-500 text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2
                         px-8 py-3.5 rounded-2xl bg-gold-500 text-black font-semibold
                         hover:bg-gold-400 transition-all duration-300
                         hover:shadow-[0_0_35px_rgba(212,175,55,0.6)]
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                t("submit")
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}