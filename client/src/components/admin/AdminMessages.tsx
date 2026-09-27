"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, Trash2, Check, MailOpen } from "lucide-react";
import {
  adminMessageService,
  type AdminMessage,
} from "@/lib/api";

interface AdminMessagesProps {
  messages: AdminMessage[];
  loading: boolean;
  onRefresh: () => void;
}

export function AdminMessages({ messages, loading, onRefresh }: AdminMessagesProps) {
  const t = useTranslations("admin.dashboard.messages");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleMarkRead = async (id: string) => {
    try {
      setProcessingId(id);
      await adminMessageService.markAsRead(id);
      onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("confirm_delete"))) return;

    try {
      setProcessingId(id);
      await adminMessageService.delete(id);
      onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      {/* الرأس */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 pb-1 leading-relaxed">
        {t("title")}
      </h2>

      {/* التحميل */}
      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
        </div>
      )}

      {/* لا رسائل */}
      {!loading && messages.length === 0 && (
        <div className="flex flex-col items-center py-20 gap-4 text-gray-500 dark:text-gray-400">
          <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center">
            <MailOpen className="w-8 h-8 text-gold-500" />
          </div>
          {t("no_messages")}
        </div>
      )}

      {/* قائمة الرسائل */}
      {!loading && messages.length > 0 && (
        <div className="grid gap-4">
          <AnimatePresence>
            {messages.map((msg, i) => {
              const isProcessing = processingId === msg._id;

              return (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative p-5 rounded-2xl border transition-all
                             ${
                               msg.isRead
                                 ? "border-gold-500/10 bg-white/50 dark:bg-dark-800/40"
                                 : "border-gold-500/40 bg-gold-500/5 dark:bg-gold-500/5"
                             } backdrop-blur-sm`}
                >
                  {/* شارة "جديد" */}
                  {!msg.isRead && (
                    <span className="absolute top-4 end-4 px-2.5 py-1 rounded-full
                                     bg-gold-500 text-black text-[10px] font-bold">
                      {t("unread")}
                    </span>
                  )}

                  {/* الرأس */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center
                                    justify-center shrink-0">
                      <Mail className="w-4 h-4 text-gold-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                        {msg.name}
                      </h3>
                      <p className="text-xs text-gold-500">{msg.email}</p>
                    </div>
                  </div>

                  {/* الموضوع */}
                  {msg.subject && (
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      📌 {msg.subject}
                    </p>
                  )}

                  {/* الرسالة */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed
                                whitespace-pre-wrap mb-4">
                    {msg.message}
                  </p>

                  {/* التاريخ والأزرار */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3
                                  pt-3 border-t border-gold-500/10">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {formatDate(msg.createdAt)}
                    </p>

                    <div className="flex items-center gap-2">
                      {!msg.isRead && (
                        <button
                          onClick={() => handleMarkRead(msg._id)}
                          disabled={isProcessing}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                     text-xs font-medium text-emerald-500
                                     border border-emerald-500/30 hover:bg-emerald-500/10
                                     transition-all disabled:opacity-50"
                        >
                          <Check className="w-3 h-3" />
                          {t("mark_read")}
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(msg._id)}
                        disabled={isProcessing}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                   text-xs font-medium text-red-500
                                   border border-red-500/30 hover:bg-red-500/10
                                   transition-all disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Trash2 className="w-3 h-3" />
                        )}
                        {t("delete")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}