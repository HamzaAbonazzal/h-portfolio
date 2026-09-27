const Skill = require("../models/Skill");

// @desc    جلب جميع المهارات
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const skills = await Skill.find(filter).sort({ order: 1 });
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

// @desc    إنشاء مهارة جديدة
// @route   POST /api/skills
// @access  Private/Admin
const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
};

// @desc    تحديث مهارة
// @route   PUT /api/skills/:id
// @access  Private/Admin
const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) {
      res.status(404);
      throw new Error("Skill not found");
    }
    res.json(skill);
  } catch (error) {
    next(error);
  }
};

// @desc    حذف مهارة
// @route   DELETE /api/skills/:id
// @access  Private/Admin
const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      res.status(404);
      throw new Error("Skill not found");
    }
    res.json({ message: "Skill removed successfully" });
  } catch (error) {
    next(error);
  }
};

// ⚠️ هذا السطر هو الأهم — لا تحذفه
module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
