const Router = require("express").Router;
const { accountsController } = require("../controllers");
const { authMiddleware } = require("../middleware");

const accountsRouter = Router();

accountsRouter.post(
  "/register",
  authMiddleware,
  accountsController.registerAccount,
);
accountsRouter.post(
  "/authenticate",
  authMiddleware,
  accountsController.isAuthenticated,
);

module.exports = {
  accountsRouter: accountsRouter,
};
