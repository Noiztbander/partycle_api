const userModel = require("./user-model");
const trackModel = require("./track-model");
const genreModel = require("./genre-model");
const playlistModel = require("./playlist-model");
const likeTrackModel = require("./like-track-model");
const likePlaylistModel = require("./like-playlist-model");
const followUserModel = require("./follow-user-model");

module.exports = {
  User: userModel,
  Track: trackModel,
  Genre: genreModel,
  Playlist: playlistModel,
  LikeTrack: likeTrackModel,
  LikePlaylist: likePlaylistModel,
  FollowUser: followUserModel,
};
