const Message = require("../models/Message");

// @desc    استقبال رسالة جديدة من الزائر
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }

    const newMessage = await Message.create({ name, email, subject, message });
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    جلب جميع الرسائل (للمشرف)
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// @desc    تحديد رسالة كمقروءة
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
const markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true },
    );
    if (!message) {
      res.status(404);
      throw new Error("Message not found");
    }
    res.json(message);
  } catch (error) {
    next(error);
  }
};

// @desc    حذف رسالة
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      res.status(404);
      throw new Error("Message not found");
    }
    res.json({ message: "Message removed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createMessage, getMessages, markAsRead, deleteMessage };
