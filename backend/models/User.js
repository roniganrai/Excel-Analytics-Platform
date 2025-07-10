const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Remove extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Normalize emails
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt & updatedAt
  }
);

module.exports = mongoose.model("User", UserSchema);
