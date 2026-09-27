"use client";

import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  const socials = [
    {
      icon: FaGithub,
      href: "https://github.com/yourusername",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com/yourusername",
      label: "Twitter",
    },
    {
      icon: FaEnvelope,
      href: "mailto:hamzaabonazzal@gmail.com",
      label: "Email",
    },
  ];

  const links = [
    { href: "/#home", label: tNav("home") },
    { href: "/#about", label: tNav("about") },
    { href: "/#skills", label: tNav("skills") },
    { href: "/#projects", label: tNav("projects") },
    { href: "/#contact", label: tNav("contact") },
  ];

  return (
    <footer className="relative mt-20 border-t border-gold-500/10 bg-gradient-to-b from-transparent to-gold-500/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* الشعار والوصف*/}
          <Link href="/" className="inline-block">
            <img
              src="/logo.svg"
              alt="Hamza Programmer"
              className="h-14 w-auto"
              style={{ filter: "drop-shadow(0 2px 8px rgba(212,175,55,0.3))" }}
            />
          </Link>

          {/* روابط سريعة */}
          <div>
            <h4 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gold-500
                               transition-colors duration-300 inline-flex items-center gap-2
                               group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-500/40 group-hover:bg-gold-500 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* تواصل اجتماعي */}
          <div>
            <h4 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full
                             border border-gold-500/20 text-gray-600 dark:text-gray-400
                             hover:border-gold-500 hover:text-gold-500
                             hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
                             transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              hamzaabonazzal@gmail.com
            </p>
          </div>
        </div>

        {/* سطر الحقوق */}
        <div className="pt-8 border-t border-gold-500/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            © {year} Hamza Abonazzal. {t("rights")}.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1.5">
            {t("made_with")}
            <Heart className="w-3 h-3 text-gold-500 fill-gold-500 animate-pulse" />
            {t("by")}
            <span className="text-gold-500 font-semibold">Hamza</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
