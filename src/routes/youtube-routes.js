const Router = require("express").Router;
const { youtubeController } = require("../controllers");
const { authMiddleware } = require("../middleware");

const youtubeRouter = Router();

youtubeRouter.get(
  "/search",
  authMiddleware,
  youtubeController.getYoutubeSearch,
);

module.exports = {
  youtubeRouter: youtubeRouter,
};