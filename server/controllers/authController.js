const User = require("../models/User");
const jwt = require("jsonwebtoken");

// توليد JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    تسجيل الدخول للمشرف
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    جلب بيانات المشرف الحالي
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe };
