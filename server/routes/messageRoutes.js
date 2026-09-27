const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} = require("../controllers/messageController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(createMessage) // عام لأي زائر
  .get(protect, adminOnly, getMessages); // للمشرف فقط

router.put("/:id/read", protect, adminOnly, markAsRead);
router.delete("/:id", protect, adminOnly, deleteMessage);

module.exports = router;
