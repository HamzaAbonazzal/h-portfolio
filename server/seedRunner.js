const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Project = require("./models/Project");

/**
 * دالة بذر قاعدة البيانات (تعمل داخل Render مباشرة)
 */
async function runSeed() {
  const results = {
    admin: { created: false, message: "" },
    projects: { count: 0, message: "" },
  };

  try {
    // ═══════════════════════════════════════
    // 1. بذر حساب المشرف
    // ═══════════════════════════════════════
    const adminEmail = "admin@portfolio.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      results.admin.message = "Admin already exists";
    } else {
      await User.create({
        name: "Hamza Admin",
        email: adminEmail,
        password: "admin123456",
        isAdmin: true,
      });
      results.admin.created = true;
      results.admin.message = "Admin created successfully";
    }

    // ═══════════════════════════════════════
    // 2. بذر المشاريع التجريبية
    // ═══════════════════════════════════════
    const existingProjects = await Project.countDocuments();

    if (existingProjects > 0) {
      results.projects.message = `${existingProjects} projects already exist`;
    } else {
      const sampleProjects = [
        {
          title_en: "E-Commerce Platform",
          title_ar: "منصة تجارة إلكترونية",
          description_en:
            "A full-featured e-commerce platform with cart, checkout, and admin dashboard.",
          description_ar:
            "منصة تجارة إلكترونية متكاملة مع سلة تسوق، دفع، ولوحة تحكم.",
          longDescription_en:
            "Built with Next.js and Node.js, supporting product management, user authentication, order processing, and Stripe integration.",
          longDescription_ar:
            "مبنية بـ Next.js و Node.js، تدعم إدارة المنتجات، المصادقة، معالجة الطلبات، وربط Stripe.",
          image:
            "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
          techStack: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind"],
          category: "fullstack",
          githubUrl: "https://github.com/yourusername/ecommerce",
          liveUrl: "https://ecommerce-demo.vercel.app",
          featured: true,
          order: 1,
        },
        {
          title_en: "Task Management App",
          title_ar: "تطبيق إدارة المهام",
          description_en:
            "A collaborative task management tool with real-time updates.",
          description_ar: "أداة إدارة مهام تعاونية مع تحديثات فورية.",
          longDescription_en:
            "Real-time task management using Socket.io with drag-and-drop kanban boards.",
          longDescription_ar:
            "إدارة مهام فورية باستخدام Socket.io مع لوحات كانبان.",
          image:
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
          techStack: ["React", "Express", "Socket.io", "MongoDB"],
          category: "fullstack",
          githubUrl: "https://github.com/yourusername/taskapp",
          liveUrl: "https://taskapp-demo.vercel.app",
          featured: true,
          order: 2,
        },
        {
          title_en: "Portfolio Website",
          title_ar: "موقع بورتفوليو",
          description_en: "A modern, animated portfolio built with Next.js.",
          description_ar: "بورتفوليو حديث وأنيق مبني بـ Next.js.",
          longDescription_en:
            "Dark/light mode, bilingual (AR/EN), and smooth Framer Motion animations.",
          longDescription_ar: "وضع ليلي/نهاري، دعم عربي/إنجليزي، وأنميشن سلس.",
          image:
            "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
          techStack: ["Next.js", "Tailwind", "Framer Motion"],
          category: "frontend",
          githubUrl: "https://github.com/yourusername/portfolio",
          liveUrl: "https://my-portfolio.vercel.app",
          featured: true,
          order: 3,
        },
        {
          title_en: "Blog Platform",
          title_ar: "منصة مدونة",
          description_en:
            "A blogging platform with markdown support and admin panel.",
          description_ar: "منصة تدوين تدعم Markdown مع لوحة تحكم.",
          longDescription_en:
            "Multi-author blog with categories, comments, and SEO.",
          longDescription_ar: "مدونة متعددة المؤلفين مع تصنيفات وتعليقات.",
          image:
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
          techStack: ["Next.js", "MongoDB", "Tailwind"],
          category: "fullstack",
          githubUrl: "https://github.com/yourusername/blog",
          liveUrl: "https://blog-demo.vercel.app",
          order: 4,
        },
        {
          title_en: "Weather Dashboard",
          title_ar: "لوحة الطقس",
          description_en:
            "Real-time weather app with beautiful visualizations.",
          description_ar: "تطبيق طقس فوري مع رسومات جميلة.",
          longDescription_en: "Uses OpenWeather API with animated charts.",
          longDescription_ar: "يستخدم OpenWeather API مع رسوم متحركة.",
          image:
            "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800",
          techStack: ["React", "Chart.js", "Tailwind"],
          category: "frontend",
          githubUrl: "https://github.com/yourusername/weather",
          liveUrl: "https://weather-demo.vercel.app",
          order: 5,
        },
        {
          title_en: "REST API for SaaS",
          title_ar: "REST API لمنصة SaaS",
          description_en:
            "Scalable backend API with authentication and role-based access.",
          description_ar: "API خلفي قابل للتوسع مع مصادقة وصلاحيات.",
          longDescription_en:
            "JWT authentication, rate limiting, and Swagger documentation.",
          longDescription_ar: "مصادقة JWT، تحديد معدل الطلبات، وتوثيق Swagger.",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
          techStack: ["Node.js", "Express", "MongoDB", "JWT"],
          category: "backend",
          githubUrl: "https://github.com/yourusername/saas-api",
          order: 6,
        },
      ];

      await Project.insertMany(sampleProjects);
      results.projects.count = sampleProjects.length;
      results.projects.message = `${sampleProjects.length} projects added successfully`;
    }

    return { success: true, results };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      results,
    };
  }
}

module.exports = { runSeed };
