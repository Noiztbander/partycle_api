const { errorMiddleware } = require("./error-middleware");
const { authMiddleware } = require("./auth-middleware");
const { ownerMiddleware } = require("./owner-middleware");

module.exports = {
  errorMiddleware: errorMiddleware,
  authMiddleware: authMiddleware,
  ownerMiddleware: ownerMiddleware,
};
