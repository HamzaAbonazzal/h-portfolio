"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderOpen,
  Mail,
  LogOut,
  ExternalLink,
  TrendingUp,
  Plus,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  projectService,
  adminMessageService,
  type Project,
  type AdminMessage,
} from "@/lib/api";
import { AdminProjects } from "@/components/admin/AdminProjects";
import { AdminMessages } from "@/components/admin/AdminMessages";

type Tab = "projects" | "messages";

export default function AdminDashboard() {
  const t = useTranslations("admin.dashboard");
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب البيانات
  const fetchData = async () => {
    try {
      setLoading(true);
      const [projData, msgData] = await Promise.all([
        projectService.getAll(),
        adminMessageService.getAll().catch(() => []),
      ]);
      setProjects(projData);
      setMessages(msgData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // الإحصائيات
  const stats = [
    {
      icon: FolderOpen,
      value: projects.length,
      label: t("stats.total_projects"),
      color: "text-cyan-400",
    },
    {
      icon: TrendingUp,
      value: projects.filter((p) => p.featured).length,
      label: t("stats.featured_projects"),
      color: "text-gold-500",
    },
    {
      icon: Mail,
      value: messages.filter((m) => !m.isRead).length,
      label: t("stats.unread_messages"),
      color: "text-red-400",
    },
    {
      icon: Mail,
      value: messages.length,
      label: t("stats.total_messages"),
      color: "text-emerald-400",
    },
  ];

  const tabs = [
    { id: "projects" as Tab, label: t("tabs.projects"), icon: FolderOpen },
    { id: "messages" as Tab, label: t("tabs.messages"), icon: Mail },
  ];

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* الرأس */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30
                              flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-gold-500" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold pb-1 leading-relaxed">
                  {t("title")}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("welcome")}, <span className="text-gold-500 font-medium">{user?.name}</span>
                </p>
              </div>
            </div>
          </div>

          {/* أزرار */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                         border border-gold-500/30 text-gold-500 text-sm font-medium
                         hover:bg-gold-500/10 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              {t("view_site")}
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                         border border-red-500/30 text-red-500 text-sm font-medium
                         hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              {t("logout")}
            </button>
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl border border-gold-500/10
                           bg-white/50 dark:bg-dark-800/40 backdrop-blur-sm
                           hover:border-gold-500/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    {stat.value}
                  </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* الأزرار (Tabs) */}
        <div className="flex gap-2 mb-6 p-1.5 rounded-2xl border border-gold-500/20
                        bg-white/50 dark:bg-dark-800/40 backdrop-blur-sm w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl
                           text-sm font-semibold transition-colors duration-300 z-10
                           ${
                             isActive
                               ? "text-black"
                               : "text-gray-600 dark:text-gray-400 hover:text-gold-500"
                           }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="adminTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500
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

        {/* المحتوى */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "projects" ? (
              <AdminProjects
                projects={projects}
                loading={loading}
                onRefresh={fetchData}
              />
            ) : (
              <AdminMessages
                messages={messages}
                loading={loading}
                onRefresh={fetchData}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}