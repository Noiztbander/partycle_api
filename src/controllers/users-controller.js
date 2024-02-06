const { User, FollowUser } = require("../models");
const { generateResponse } = require("../utils/responseUtils");
const { buildThumbnail } = require("../utils/utils");

async function buildUser(requestUserId, user) {
  try {
    const followed = await FollowUser.findOne({
      author: requestUserId,
      followed: user.id,
    });
    const followers = await FollowUser.countDocuments({ followed: user.id });

    return {
      id: user.id,
      displayName: user.displayName,
      picture: user.picture,
      followers: followers,
      followed: !!followed,
    };
  } catch (error) {
    return null;
  }
}

async function getMyUser(req, res, next) {
  const { firebase_id } = req.user;
  try {
    const dbResponse = await User.findOne({ firebase_id: firebase_id });

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "User not found",
        }),
      );
    }

    return res.status(200).send(
      generateResponse({
        data: dbResponse,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function getUserPublicInfo(req, res, next) {
  const {
    user: { firebase_id: requestUserId },
    params: { id: userId },
  } = req;
  try {
    const followed = await FollowUser.findOne({
      author: requestUserId,
      followed: userId,
    });

    const followers = await FollowUser.countDocuments({ followed: userId });

    const user = await User.findOne({ firebase_id: userId });

    if (!user || user?.error) {
      return res.status(404).send(
        generateResponse({
          error: "User not found",
        }),
      );
    }

    const userPublicInfo = {
      id: user.firebase_id,
      name: user.displayName,
      picture: user.picture,
      followers: followers,
      followed: !!followed,
    };

    return res.status(200).send(
      generateResponse({
        data: userPublicInfo,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function getUsersMix(req, res, next) {
  const {
    body: { users: userIds },
    user: { firebase_id: userId },
  } = req;

  try {
    const dbResponse = await User.find({ firebase_id: { $in: userIds } });

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Users not found",
        }),
      );
    }
    const users = [];
    for (const user of dbResponse) {
      const userData = await buildUser(userId, user);
      if (userData) {
        users.push(userData);
      }
    }
    const ThumbnailMix = users.length
      ? buildThumbnail(users.filter((user) => !!user.picture))
      : [];
    const usersMix = { thumbnail: ThumbnailMix, users: users };
    return res.status(200).send(
      generateResponse({
        data: usersMix,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const dbResponse = await User.findOneAndUpdate(
      { firebase_id: req.user.firebase_id },
      req.body,
    );

    if (!dbResponse || dbResponse?.error) {
      return res.status(400).send(
        generateResponse({
          error: "Unable to update User's profile",
        }),
      );
    }

    return res.status(200).send(
      generateResponse({
        data: dbResponse,
      }),
    );
  } catch (err) {
    next(err);
  }
}
module.exports = {
  getMyUser: getMyUser,
  getUserPublicInfo: getUserPublicInfo,
  getUsersMix: getUsersMix,
  updateUser: updateUser,
};
