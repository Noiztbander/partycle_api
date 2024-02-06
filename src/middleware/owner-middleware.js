const { generateResponse } = require("../utils/responseUtils");

async function ownerMiddleware(req, res, next, entity) {
  try {
    const item = await entity.findById(req.params.id);
    if (!item || item?.error) {
      return res.status(404).send(
        generateResponse({
          error: `${entity.modelName} not found`,
        }),
      );
    }

    const { firebase_id: userId } = req.user;
    if (userId !== item.owner) {
      return res.status(403).send(
        generateResponse({
          error: `Only the owner of this ${entity.modelName} can perform this action`,
        }),
      );
    }

    next();
  } catch (error) {
    res.status(400).send({
      data: null,
      error: error,
    });
  }
}

module.exports = {
  ownerMiddleware: ownerMiddleware,
};
