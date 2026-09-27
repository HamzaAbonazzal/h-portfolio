const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { runSeed } = require("./seedRunner");

// Routes
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const messageRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// ✅ إعدادات CORS
const corsOptions = {
  origin: [
    "https://h-portfolio-000.vercel.app",
    "https://h-portfolio-9cda.vercel.app",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

dotenv.config();

// ═══════════════════════════════════════════════════════════
// 🚀 تشغيل السيرفر مع بذر تلقائي
// ═══════════════════════════════════════════════════════════
const startServer = async () => {
  try {
    // 1. الاتصال بقاعدة البيانات
    await connectDB();
    console.log("✅ MongoDB Connected");

    // 2. ✅ البذر التلقائي (فقط إذا كانت القاعدة فارغة)
    console.log("🔍 Checking if seeding is needed...");
    try {
      const seedResult = await runSeed();

      if (seedResult.success) {
        if (seedResult.results.admin.created) {
          console.log("✅ Admin user created");
        } else {
          console.log("ℹ️  Admin already exists");
        }

        if (seedResult.results.projects.count > 0) {
          console.log(`✅ ${seedResult.results.projects.count} projects added`);
        } else {
          console.log("ℹ️  Projects already exist");
        }
      } else {
        console.warn("⚠️  Seeding skipped:", seedResult.error);
      }
    } catch (seedError) {
      console.warn("⚠️  Seeding error (non-blocking):", seedError.message);
    }

    // 3. إعداد Express
    const app = express();

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // المسار الرئيسي
    app.get("/", (req, res) => {
      res.json({ message: "Portfolio API is running..." });
    });

    // ✅ مسار يدوي للبذر (اختياري - للاستخدام لاحقاً)
    app.post("/api/seed", async (req, res) => {
      const secret = req.headers["x-seed-secret"];
      if (!secret || secret !== process.env.SEED_SECRET) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const result = await runSeed();
      res.json(result);
    });

    // مسارات الـ API
    app.use("/api/projects", projectRoutes);
    app.use("/api/skills", skillRoutes);
    app.use("/api/messages", messageRoutes);
    app.use("/api/auth", authRoutes);

    // معالجة الأخطاء
    app.use(notFound);
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
