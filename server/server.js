const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const messageRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// ✅ إعدادات CORS (متوافقة مع Express 5 وتعتمد على متغيرات البيئة)
const corsOptions = {
  origin: [
    "https://h-portfolio-000.vercel.app", // رابط الإنتاج على Vercel
    "http://localhost:3000", // للتطوير المحلي
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // ✅ الطرق المسموح بها
  allowedHeaders: ["Content-Type", "Authorization"], // ✅ الرؤوس المسموح بها
  optionsSuccessStatus: 200, // ✅ مهم لبعض المتصفحات القديمة
};

dotenv.config();
connectDB();

const app = express();

// ✅ استخدام إعدادات CORS قبل أي مسار آخر
// هذا يتعامل تلقائياً مع طلبات OPTIONS (Preflight)
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// المسار الرئيسي
app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running..." });
});

// مسارات الـ API
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);

// معالجة الأخطاء (يجب أن تكون في النهاية)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
