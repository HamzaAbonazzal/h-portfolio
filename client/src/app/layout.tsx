import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Hamza Abonazzal — Full Stack Developer",
    template: "%s | Hamza Abonazzal",
  },
  description:
    "Full Stack Developer specializing in React, Next.js, and Node.js. Building modern, fast, and scalable web applications.",
  keywords: [
    "Hamza Abonazzal",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Web Developer",
    "Syria",
    "Aleppo",
  ],
  authors: [{ name: "Hamza Abonazzal" }],
  creator: "Hamza Abonazzal",
  icons: {
    icon: "/favicon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Script منع وميض الثيم + ضبط اللغة */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                  var path = window.location.pathname;
                  var locale = path.split('/')[1] || 'en';
                  document.documentElement.lang = locale;
                  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}