const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const signupschema = new mongoose.Schema({
  email: {
    type: String,
    required: [true],
    unique: [true, , "Email id already exist"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid emails"],
  },
  password: {
    type: String,
    required: [true],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  passwordConfirm: {
    type: String,
    // required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
});

signupschema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

signupschema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", signupschema);

module.exports = User;
