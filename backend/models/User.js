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
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // every new user will be a normal user unless changed manually
    },
  },
  {
    timestamps: true, // Automatically manages createdAt & updatedAt
  }
);

module.exports = mongoose.model("User", UserSchema);
