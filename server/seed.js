const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@portfolio.com" });

    if (adminExists) {
      console.log("✅ Admin already exists");
      process.exit(0);
    }

    await User.create({
      name: "Hamza Admin",
      email: "admin@portfolio.com",
      password: "admin123456", // ⚠️ غيرها في الإنتاج
      isAdmin: true,
    });

    console.log("✅ Admin created successfully");
    console.log("📧 Email: admin@portfolio.com");
    console.log("🔑 Password: admin123456");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedAdmin();
