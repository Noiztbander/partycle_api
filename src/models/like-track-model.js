const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const LikeTrackSchema = Schema(
  {
    author: String,
    followed: { type: mongoose.Schema.Types.ObjectId, ref: "track" },
  },
  {
    timestamps: true,
  },
);

const LikeTrack = mongoose.model("likeTrack", LikeTrackSchema);

module.exports = LikeTrack;
