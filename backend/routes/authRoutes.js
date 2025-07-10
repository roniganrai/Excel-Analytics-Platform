const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

// 🔐 Auth Routes
router.post("/register", register); // Handle user registration
router.post("/login", login); // Handle user login

module.exports = router;
