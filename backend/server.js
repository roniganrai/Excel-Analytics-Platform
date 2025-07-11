require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware: Open CORS for all origins temporarily (safe for early deployment)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

// ✅ Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// ✅ Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("📦 MongoDB connected successfully"))
  .catch((error) => console.error("❌ DB Connection Failed:", error.message));

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("🚀 Excel Analytics backend is up and running!");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
