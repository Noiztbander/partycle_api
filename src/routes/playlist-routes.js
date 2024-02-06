const Router = require("express").Router;
const { playlistsController } = require("../controllers");
const { authMiddleware, ownerMiddleware } = require("../middleware");
const { Playlist } = require("../models");

const playlistsRouter = Router();

function checkPlaylistOwnership(req, res, next) {
  return ownerMiddleware(req, res, next, Playlist);
}

playlistsRouter.post(
  "/:id/track/:trackId",
  authMiddleware,
  checkPlaylistOwnership,
  playlistsController.addTrackToPlaylist,
);
playlistsRouter.post("/", authMiddleware, playlistsController.createPlaylist);
playlistsRouter.post(
  "/mix",
  authMiddleware,
  playlistsController.getPlaylistsMix,
);
playlistsRouter.get(
  "/my-playlists",
  authMiddleware,
  playlistsController.getMyPlaylists,
);
playlistsRouter.get(
  "/my-liked-playlists",
  authMiddleware,
  playlistsController.getMyLikedPlaylists,
);
playlistsRouter.get(
  "/by-user/:id",
  authMiddleware,
  playlistsController.getPlaylistsByUser,
);
playlistsRouter.get("/:id", authMiddleware, playlistsController.getPlaylist);
playlistsRouter.get("/", authMiddleware, playlistsController.getPlaylists);
playlistsRouter.put(
  "/:id",
  authMiddleware,
  checkPlaylistOwnership,
  playlistsController.updatePlaylist,
);
playlistsRouter.delete(
  "/:id/track/:trackId",
  authMiddleware,
  checkPlaylistOwnership,
  playlistsController.removeTrackFromPlaylist,
);
playlistsRouter.delete(
  "/:id",
  authMiddleware,
  checkPlaylistOwnership,
  playlistsController.deletePlaylist,
);

module.exports = {
  playlistsRouter: playlistsRouter,
};
