const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  userImageUrl: {
    type: String,
    required: false,
  },
  ////
  confirmPassword: {
    type: String,
    required: true,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  accountLocked: {
    type: Boolean,
    default: false,
  },
  lastFailedLoginAttempt: {
    type: Date,
    default: null,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  passwordHistory: [
    {
      type: String,
      required: true,
    },
  ],
});

const Users = mongoose.model("users", userSchema);
module.exports = Users;
