import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==================== الأنواع (Types) ====================
export interface Project {
  _id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  longDescription_en?: string;
  longDescription_ar?: string;
  image: string;
  images?: string[];
  techStack: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

// ==================== خدمات المشاريع ====================
export const projectService = {
  // جلب جميع المشاريع
  async getAll(params?: { category?: string; featured?: boolean }) {
    const res = await api.get<Project[]>("/projects", { params });
    return res.data;
  },

  // جلب مشروع واحد
  async getById(id: string) {
    const res = await api.get<Project>(`/projects/${id}`);
    return res.data;
  },
};

// ==================== خدمات الرسائل ====================
export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const messageService = {
  async send(data: ContactMessage) {
    const res = await api.post("/messages", data);
    return res.data;
  },
};

// ==================== خدمات المصادقة ====================
export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export const authService = {
  async login(email: string, password: string) {
    const res = await api.post<AuthResponse>("/auth/login", { email, password });
    return res.data;
  },

  async getMe() {
    const token = localStorage.getItem("admin_token");
    const res = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

// ==================== خدمات المشاريع (للمشرف) ====================
export const adminProjectService = {
  async create(data: Partial<Project>) {
    const token = localStorage.getItem("admin_token");
    const res = await api.post<Project>("/projects", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async update(id: string, data: Partial<Project>) {
    const token = localStorage.getItem("admin_token");
    const res = await api.put<Project>(`/projects/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async delete(id: string) {
    const token = localStorage.getItem("admin_token");
    const res = await api.delete(`/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

// ==================== خدمات الرسائل (للمشرف) ====================
export interface AdminMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const adminMessageService = {
  async getAll() {
    const token = localStorage.getItem("admin_token");
    const res = await api.get<AdminMessage[]>("/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async markAsRead(id: string) {
    const token = localStorage.getItem("admin_token");
    const res = await api.put(
      `/messages/${id}/read`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },

  async delete(id: string) {
    const token = localStorage.getItem("admin_token");
    const res = await api.delete(`/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};