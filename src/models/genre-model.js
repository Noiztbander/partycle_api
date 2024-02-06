const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const GenreSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Genre name is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Genre = mongoose.model("genre", GenreSchema);

module.exports = Genre;
