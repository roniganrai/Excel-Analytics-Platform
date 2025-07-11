const User = require("../models/User");

// 🔐 Admin-only: Get list of all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error: Unable to fetch users" });
  }
};

module.exports = {
  getAllUsers,
};
