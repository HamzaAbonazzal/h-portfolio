"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // منع التمرير عند فتح القائمة في الجوال
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: "/#home", label: t("home") },
    { href: "/#about", label: t("about") },
    { href: "/#skills", label: t("skills") },
    { href: "/#projects", label: t("projects") },
    { href: "/#contact", label: t("contact") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-white/70 dark:bg-dark-900/70 border-b border-gold-500/10 shadow-lg shadow-gold-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.svg"
              alt="Hamza Programmer"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              style={{ filter: "drop-shadow(0 2px 8px rgba(212,175,55,0.3))" }}
            />
          </Link>

          {/* روابط سطح المكتب */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300
                           hover:text-gold-500 dark:hover:text-gold-400 transition-colors duration-300
                           group"
              >
                {link.label}
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold-500 rounded-full
                                 transition-all duration-300 group-hover:w-1/2"
                />
              </a>
            ))}
          </nav>

          {/* أزرار التحكم */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center px-5 h-10 rounded-full bg-gold-500 text-black
                         text-sm font-semibold hover:bg-gold-400 transition-all duration-300
                         hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
            >
              {t("hire_me")}
            </a>

            {/* زر قائمة الجوال */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full
                         border border-gold-500/30 hover:border-gold-500 transition-colors"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-gold-500" />
              ) : (
                <Menu className="w-5 h-5 text-gold-500" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* قائمة الجوال */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 z-40 lg:hidden backdrop-blur-xl bg-white/95 dark:bg-dark-900/95"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-4 text-lg font-medium border-b border-gold-500/10
                             hover:text-gold-500 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="flex items-center gap-3 pt-6">
                <LocaleSwitcher />
                <ThemeToggle />
              </div>

              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 text-center px-5 py-3 rounded-full bg-gold-500 text-black
                           font-semibold hover:bg-gold-400 transition-all
                           hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
              >
                {t("hire_me")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
