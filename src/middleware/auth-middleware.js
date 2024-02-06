const { getAuthToken, verifyAuthToken } = require("../services/firebase");
const { generateResponse } = require("../utils/responseUtils");

async function authMiddleware(req, res, next) {
  try {
    const bearerToken = await getAuthToken(req.headers);
    const userClaims = await verifyAuthToken(bearerToken);

    const { displayName, email, uid, picture = "", emailVerified } = userClaims;
    req.user = {
      displayName: displayName,
      email: email,
      firebase_id: uid,
      picture: picture,
      active: emailVerified,
    };

    next();
  } catch (error) {
    return res.status(401).send(
      generateResponse({
        error: "Something went wrong",
      }),
    );
  }
}

module.exports = {
  authMiddleware: authMiddleware,
};
