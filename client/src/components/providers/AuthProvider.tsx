"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("admin_token");
      const savedUser = localStorage.getItem("admin_user");

      if (savedToken && savedUser) {
        // ✅ تحقق من صحة JSON قبل استخدامه
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);
      }
    } catch (error) {
      // ✅ إذا كانت البيانات تالفة، احذفها وابدأ من جديد
      console.warn("Invalid localStorage data, clearing...");
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("admin_token", newToken);
    localStorage.setItem("admin_user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setToken(null);
    setUser(null);
    router.push("/admin/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
