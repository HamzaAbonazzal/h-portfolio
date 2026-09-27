const Project = require("../models/Project");

// @desc    جلب جميع المشاريع
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured) filter.featured = featured === "true";

    const projects = await Project.find(filter).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    جلب مشروع واحد
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    إنشاء مشروع جديد
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    تحديث مشروع
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    حذف مشروع
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    res.json({ message: "Project removed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
