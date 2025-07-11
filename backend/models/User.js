const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // ✅ Trims extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // ✅ Converts to lowercase
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // 🕒 createdAt & updatedAt fields
  }
);

module.exports = mongoose.model("User", UserSchema);
