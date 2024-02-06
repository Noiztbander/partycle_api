const { usersRouter } = require("./users-routes");
const { accountsRouter } = require("./accounts-routes");
const { tracksRouter } = require("./tracks-routes");
const { playlistsRouter } = require("./playlist-routes");
const { socialRouter } = require("./social-routes");
const { genresRouter } = require("./genres-routes");
const { youtubeRouter } = require("./youtube-routes");

module.exports = {
  usersRouter,
  accountsRouter,
  tracksRouter,
  playlistsRouter,
  socialRouter,
  genresRouter,
  youtubeRouter,
};
