const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const LikePlaylistSchema = Schema(
  {
    author: String,
    followed: { type: mongoose.Schema.Types.ObjectId, ref: "playlist" },
  },
  {
    timestamps: true,
  },
);

const LikePlaylist = mongoose.model("likePlaylist", LikePlaylistSchema);

module.exports = LikePlaylist;
