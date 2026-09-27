const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name_en: { type: String, required: true, trim: true },
    name_ar: { type: String, required: true, trim: true },
    icon: { type: String, required: true },
    category: {
      type: String,
      enum: ["frontend", "backend", "tools", "soft"],
      required: true,
    },
    percentage: { type: Number, min: 0, max: 100, default: 80 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Skill", skillSchema);
