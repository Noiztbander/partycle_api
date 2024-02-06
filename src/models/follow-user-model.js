const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const FollowUserSchema = Schema(
  {
    author: String,
    followed: String,
  },
  {
    timestamps: true,
  },
);

const FollowUser = mongoose.model("followUser", FollowUserSchema);

module.exports = FollowUser;
