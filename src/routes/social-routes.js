const Router = require("express").Router;
const { socialController } = require("../controllers");
const { authMiddleware } = require("../middleware");

const socialRouter = Router();

socialRouter.post(
  "/like-track/:id",
  authMiddleware,
  socialController.addLikeTrack,
);
socialRouter.delete(
  "/like-track/:id",
  authMiddleware,
  socialController.removeLikeTrack,
);

socialRouter.post(
  "/like-playlist/:id",
  authMiddleware,
  socialController.addLikePlaylist,
);
socialRouter.delete(
  "/like-playlist/:id",
  authMiddleware,
  socialController.removeLikePlaylist,
);

socialRouter.post(
  "/follow-user/:id",
  authMiddleware,
  socialController.addFollowUser,
);
socialRouter.delete(
  "/follow-user/:id",
  authMiddleware,
  socialController.removeFollowUser,
);

module.exports = {
  socialRouter: socialRouter,
};
