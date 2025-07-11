const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers?.authorization;

  // 🔒 No token found
  if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Unauthorized: Token missing." });
  }

  const token = bearerHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded payload (userId, role, etc.)
    next();
  } catch (err) {
    console.error("❌ JWT Error:", err.message);
    return res
      .status(401)
      .json({ msg: "Unauthorized: Invalid or expired token." });
  }
};

module.exports = verifyToken;
