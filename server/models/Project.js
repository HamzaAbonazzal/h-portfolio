const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title_en: { type: String, required: true, trim: true },
    title_ar: { type: String, required: true, trim: true },
    description_en: { type: String, required: true },
    description_ar: { type: String, required: true },
    longDescription_en: { type: String, default: "" },
    longDescription_ar: { type: String, default: "" },
    image: { type: String, required: true },
    images: [{ type: String }],
    techStack: [{ type: String, required: true }],
    category: { type: String, default: "web" },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
