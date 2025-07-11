const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");

// 👤 GET: Logged-in user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const profile = await User.findById(req.user.id).select("-password");
    if (!profile) {
      return res.status(404).json({ msg: "User profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ msg: "Server error while fetching profile" });
  }
});

// ✏️ PUT: Update user's name
router.put("/update", verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ msg: "Profile update failed" });
  }
});

module.exports = router;
