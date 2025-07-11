require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware setup
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:3000", // your local frontend
      "https://excel-analytics-web.onrender.com", // your deployed frontend
    ],
    credentials: true,
  })
);
app.use(express.json());

// ✅ Route imports
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");

// ✅ Use routes
app.use("/api/auth", authRoutes); // 🔐 Auth: /register, /login
app.use("/api/user", userRoutes); // 👤 Profile: /profile, /update

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("📦 MongoDB connected successfully"))
  .catch((error) => console.error("❌ DB Connection Failed:", error.message));

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("🚀 Excel Analytics backend is up and running!");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
