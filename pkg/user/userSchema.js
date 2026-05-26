const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must have name"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  role: {
    type: String,
    enam: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Must have a password"],
    minLenght: [4, "Password must be at least 4 characters"],
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
