const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Encrypt password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create user with default role = 'user'
    const user = new User({
      name,
      email,
      password: hashedPwd,
      role: "user", // 👈 default role set here
    });

    await user.save();

    res.status(201).json({ msg: "Registration successful" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ msg: "Server error during registration" });
  }
};

// Log in existing user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        name: existingUser.name,
        role: existingUser.role, // 👈 include role in token
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role, // 👈 return role here
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error during login" });
  }
};

module.exports = { register, login };
