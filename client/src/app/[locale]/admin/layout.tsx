"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [user, loading, router, isLoginPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
      </div>
    );
  }

  // صفحة تسجيل الدخول لا تحتاج حماية
  if (isLoginPage) return <>{children}</>;

  if (!user) return null;

  return <>{children}</>;
}