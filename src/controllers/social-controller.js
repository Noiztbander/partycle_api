const db = require("../models");
const { generateResponse } = require("../utils/responseUtils");

async function addLikeTrack(req, res, next) {
  try {
    const {
      user: { firebase_id: userId },
      params: { id: trackId },
    } = req;

    const likedTrack = await db.LikeTrack.findOne({
      author: userId,
      followed: trackId,
    });

    if (likedTrack) {
      return res.status(200).send(
        generateResponse({
          data: "User already likes the track",
        }),
      );
    }

    if (likedTrack?.error) next(likedTrack.error);

    const dbResponse = await db.LikeTrack.create({
      author: userId,
      followed: trackId,
    });

    if (!dbResponse || dbResponse?.error) {
      return res.status(400).send(
        generateResponse({
          error: "Like track couldn't be set",
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

async function removeLikeTrack(req, res, next) {
  try {
    const {
      user: { firebase_id: userId },
      params: { id: trackId },
    } = req;

    const likedTrack = await db.LikeTrack.findOneAndDelete({
      author: userId,
      followed: trackId,
    });

    if (!likedTrack) {
      return res.status(200).send(
        generateResponse({
          data: "User already doesn't like the track",
        }),
      );
    }

    if (likedTrack?.error) {
      return res.status(400).send(
        generateResponse({
          error: "Like track couldn't be unset",
        }),
      );
    }

    return res.status(202).send(
      generateResponse({
        data: likedTrack,
      }),
    );
  } catch (err) {
    next(err);
  }
}

async function addLikePlaylist(req, res, next) {
  try {
    const {
      user: { firebase_id: userId },
      params: { id: playlistId },
    } = req;

    const likedPlaylist = await db.LikePlaylist.findOne({
      author: userId,
      followed: playlistId,
    });

    if (likedPlaylist) {
      return res.status(200).send(
        generateResponse({
          data: "User already likes the playlist",
        }),
      );
    }

    if (likedPlaylist?.error) next(likedPlaylist.error);

    const dbResponse = await db.LikePlaylist.create({
      author: userId,
      followed: playlistId,
    });

    if (!dbResponse || dbResponse?.error) {
      return res.status(400).send(
        generateResponse({
          error: "Like playlist couldn't be set",
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

async function removeLikePlaylist(req, res, next) {
  try {
    const {
      user: { firebase_id: userId },
      params: { id: playlistId },
    } = req;

    const likedPlaylist = await db.LikePlaylist.findOneAndDelete({
      author: userId,
      followed: playlistId,
    });

    if (!likedPlaylist) {
      return res.status(200).send(
        generateResponse({
          data: "User already doesn't like the playlist",
        }),
      );
    }

    if (likedPlaylist?.error) {
      return res.status(400).send(
        generateResponse({
          error: "Like playlist couldn't be unset",
        }),
      );
    }

    return res.status(202).send(
      generateResponse({
        data: likedPlaylist,
      }),
    );
  } catch (err) {
    next(err);
  }
}

async function addFollowUser(req, res, next) {
  try {
    const { firebase_id: userId } = req.user;
    const {
      params: { id: followedId },
    } = req;
    const dbResponse = await db.FollowUser.create({
      author: userId,
      followed: followedId,
    });

    if (!dbResponse || dbResponse?.error) {
      return res.status(400).send(
        generateResponse({
          error: "Follow user couldn't be set",
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

async function removeFollowUser(req, res, next) {
  try {
    const dbResponse = await db.FollowUser.findOneAndDelete({
      _id: req.params.id,
    });

    if (!dbResponse || dbResponse?.error) {
      return res.status(400).send(
        generateResponse({
          error: "Follow user couldn't be unset",
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
  addLikeTrack: addLikeTrack,
  removeLikeTrack: removeLikeTrack,
  addLikePlaylist: addLikePlaylist,
  removeLikePlaylist: removeLikePlaylist,
  addFollowUser: addFollowUser,
  removeFollowUser: removeFollowUser,
};
