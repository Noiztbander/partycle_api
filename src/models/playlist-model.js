const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PlaylistSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Playlist name is required"],
    },
    owner: {
      type: String,
      required: [true, "Playlist owner is required"],
    },
    description: String,
    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "track" }],
    thumbnailUrl: String,
    publicAccessible: Boolean,
  },
  {
    timestamps: true,
  },
);

const Playlist = mongoose.model("playlist", PlaylistSchema);

module.exports = Playlist;
