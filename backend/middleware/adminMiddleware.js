const adminMiddleware = (req, res, next) => {
  if (req.user?.role === "admin") {
    return next();
  }

  console.warn("🚫 Unauthorized admin access attempt by:", req.user?.email);
  return res.status(403).json({ msg: "Access denied. Admins only." });
};

module.exports = adminMiddleware;
