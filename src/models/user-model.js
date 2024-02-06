const mongoose = require("mongoose"); // REVIEW {Schema, model} = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = Schema(
  {
    displayName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    role: Number,
    firebase_id: {
      type: String,
      required: true,
      unique: true,
    },
    picture: String,
    newsletter: Boolean,
    active: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
