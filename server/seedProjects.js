const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Project = require("./models/Project");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const sampleProjects = [
  {
    title_en: "E-Commerce Platform",
    title_ar: "منصة تجارة إلكترونية",
    description_en:
      "A full-featured e-commerce platform with cart, checkout, and admin dashboard.",
    description_ar:
      "منصة تجارة إلكترونية متكاملة مع سلة تسوق، دفع، ولوحة تحكم للمشرف.",
    longDescription_en:
      "Built with Next.js and Node.js, this platform supports product management, user authentication, order processing, and payment integration with Stripe.",
    longDescription_ar:
      "مبنية بـ Next.js و Node.js، تدعم إدارة المنتجات، مصادقة المستخدمين، معالجة الطلبات، وربط الدفع مع Stripe.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
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
      "Real-time task management using Socket.io, with drag-and-drop kanban boards and team collaboration features.",
    longDescription_ar:
      "إدارة مهام فورية باستخدام Socket.io، مع لوحات كانبان بالسحب والإفلات وميزات التعاون الجماعي.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
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
    description_en:
      "A modern, animated portfolio built with Next.js and Framer Motion.",
    description_ar: "بورتفوليو حديث وأنيق مبني بـ Next.js و Framer Motion.",
    longDescription_en:
      "Features dark/light mode, multi-language support (AR/EN), and smooth animations.",
    longDescription_ar:
      "يحتوي على الوضع الليلي/النهاري، دعم متعدد اللغات (عربي/إنجليزي)، وأنميشن سلس.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
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
      "Multi-author blog with categories, comments, and SEO optimization.",
    longDescription_ar:
      "مدونة متعددة المؤلفين مع تصنيفات، تعليقات، وتحسين محركات البحث.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
    techStack: ["Next.js", "MongoDB", "Tailwind"],
    category: "fullstack",
    githubUrl: "https://github.com/yourusername/blog",
    liveUrl: "https://blog-demo.vercel.app",
    order: 4,
  },
  {
    title_en: "Weather Dashboard",
    title_ar: "لوحة الطقس",
    description_en: "Real-time weather app with beautiful visualizations.",
    description_ar: "تطبيق طقس فوري مع رسومات جميلة.",
    longDescription_en:
      "Uses OpenWeather API to display current weather and forecasts with animated charts.",
    longDescription_ar:
      "يستخدم OpenWeather API لعرض الطقس الحالي والتوقعات مع رسوم متحركة.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800",
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
    description_ar: "API خلفي قابل للتوسع مع مصادقة وصلاحيات حسب الدور.",
    longDescription_en:
      "JWT authentication, rate limiting, and comprehensive documentation with Swagger.",
    longDescription_ar:
      "مصادقة JWT، تحديد معدل الطلبات، وتوثيق شامل بـ Swagger.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    techStack: ["Node.js", "Express", "MongoDB", "JWT"],
    category: "backend",
    githubUrl: "https://github.com/yourusername/saas-api",
    order: 6,
  },
];

const seedProjects = async () => {
  try {
    await Project.deleteMany({});
    console.log("🗑️  Cleared existing projects");

    await Project.insertMany(sampleProjects);
    console.log(`✅ Added ${sampleProjects.length} sample projects`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedProjects();
