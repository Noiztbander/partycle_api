const Router = require("express").Router;
const { usersController } = require("../controllers");
const { authMiddleware } = require("../middleware");

const usersRouter = Router();

usersRouter.post("/mix", authMiddleware, usersController.getUsersMix);
usersRouter.get("/:id", authMiddleware, usersController.getUserPublicInfo);
usersRouter.get("/", authMiddleware, usersController.getMyUser);
usersRouter.patch("/", authMiddleware, usersController.updateUser);

module.exports = {
  usersRouter: usersRouter,
};
