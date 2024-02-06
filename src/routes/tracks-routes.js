const Router = require("express").Router;
const { tracksController } = require("../controllers");
const { authMiddleware, ownerMiddleware } = require("../middleware");
const { Track } = require("../models");

const tracksRouter = Router();

function checkTrackOwnership(req, res, next) {
  return ownerMiddleware(req, res, next, Track);
}

tracksRouter.post("/mix", authMiddleware, tracksController.getTracksMix);
tracksRouter.post("/", authMiddleware, tracksController.createTrack);
tracksRouter.get("/my-tracks", authMiddleware, tracksController.getMyTracks);
tracksRouter.get(
  "/my-liked-tracks",
  authMiddleware,
  tracksController.getMyLikedTracks,
);
tracksRouter.get(
  "/by-user/:id",
  authMiddleware,
  tracksController.getTracksByUser,
);
tracksRouter.get("/:id", authMiddleware, tracksController.getTrack);
tracksRouter.get("/", authMiddleware, tracksController.getTracks);
tracksRouter.put(
  "/:id",
  authMiddleware,
  checkTrackOwnership,
  tracksController.updateTrack,
);
tracksRouter.delete(
  "/:id",
  authMiddleware,
  checkTrackOwnership,
  tracksController.deleteTrack,
);

module.exports = {
  tracksRouter: tracksRouter,
};
