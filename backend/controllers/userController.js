const User = require("../models/User");

// 🔐 Admin-only: Get all users (excluding passwords)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ msg: "Server error while fetching users" });
  }
};

module.exports = {
  getAllUsers,
};
