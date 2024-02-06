const Router = require("express").Router;
const { genresController } = require("../controllers");
const { authMiddleware } = require("../middleware");

const genresRouter = Router();

genresRouter.post("/seed-genres", genresController.seedGenres);
genresRouter.get("/", authMiddleware, genresController.getGenres);

module.exports = {
  genresRouter: genresRouter,
};
