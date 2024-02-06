const { User } = require("../models");
const { generateResponse } = require("../utils/responseUtils");
const { constants } = require("../config");

async function registerAccount(req, res, next) {
  try {
    const { displayName, email, firebase_id, picture, active } = req.user;

    const dbResponse = await User.create({
      displayName: displayName || "",
      email: email,
      role: constants.BASIC_ROLE_CODE,
      firebase_id: firebase_id,
      picture: picture,
      newsletter: req.body.newsletter || false,
      active: active,
    });
    if (!dbResponse || dbResponse?.error) {
      return res.status(400).send(
        generateResponse({
          error: "User's register failed",
        }),
      );
    }
    return res.status(201).send(
      generateResponse({
        data: dbResponse,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function isAuthenticated(req, res, next) {
  const { firebase_id, picture } = req.user;

  try {
    const dbResponse = await User.findOne({ firebase_id: firebase_id });

    if (dbResponse.error) {
      return res.status(404).send(
        generateResponse({
          error: "User not found",
        }),
      );
    }
    if (picture)
      await User.findOneAndUpdate(
        { firebase_id: firebase_id },
        { picture: picture },
      );
    return res.status(200).send(
      generateResponse({
        data: req.user,
      }),
    );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerAccount: registerAccount,
  isAuthenticated: isAuthenticated,
};
