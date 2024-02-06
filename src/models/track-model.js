const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TrackSchema = Schema(
  {
    trackName: {
      type: String,
      trim: true,
      required: [true, "Track name is required"],
    },
    owner: {
      type: String,
      required: [true, "Track owner is required"],
    },
    released: Number,
    genre: { type: mongoose.Schema.Types.ObjectId, ref: "genre" },
    description: String,
    trackUrl: {
      type: String,
      required: [true, "Track url is required"],
    },
    thumbnailUrl: String,
    publicAccessible: Boolean,
  },
  {
    timestamps: true,
  },
);

const Track = mongoose.model("track", TrackSchema);

module.exports = Track;
