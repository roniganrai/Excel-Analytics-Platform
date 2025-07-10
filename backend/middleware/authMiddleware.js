const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  // Validate Authorization header
  if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Unauthorized: Token missing." });
  }

  const token = bearerHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // Attach user info to request object
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res
      .status(401)
      .json({ msg: "Unauthorized: Invalid or expired token." });
  }
};

module.exports = verifyToken;
