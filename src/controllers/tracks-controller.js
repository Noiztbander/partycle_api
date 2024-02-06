const db = require("../models");
const {
  generateResponse,
  getTotalPages,
  buildPaginatedData,
} = require("../utils/responseUtils");
const { buildThumbnail } = require("../utils/utils");

async function buildTrack(userId, track) {
  try {
    const liked = await db.LikeTrack.findOne({
      author: userId,
      followed: track.id,
    });
    const owner = await db.User.findOne({ firebase_id: track.owner });
    const genre = await db.Genre.findById(track.genre);
    const likes = await db.LikeTrack.countDocuments({ followed: track.id });

    return {
      id: track.id,
      trackName: track.trackName,
      owner: {
        id: track.owner,
        displayName: owner.displayName,
        picture: owner.picture ? owner.picture : "",
      },
      released: track.released ? track.released : "",
      genre: genre ? genre.name : "",
      description: track.description,
      trackUrl: track.trackUrl,
      thumbnailUrl: track.thumbnailUrl,
      publicAccessible: track.publicAccessible,
      likes: likes,
      liked: !!liked,
    };
  } catch (error) {
    return null;
  }
}

async function createTrack(req, res, next) {
  try {
    const {
      body: {
        trackName,
        released,
        description,
        trackUrl,
        thumbnailUrl,
        publicAccessible = true,
      },
      user: { firebase_id: userId },
    } = req;

    const dbResponse = await db.Track.create({
      trackName,
      released: parseInt(released),
      owner: userId,
      description,
      trackUrl,
      thumbnailUrl,
      publicAccessible,
    });

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "User not found",
        }),
      );
    }
    return res.status(201).send(
      generateResponse({
        data: await buildTrack(userId, dbResponse),
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function getTrack(req, res, next) {
  const {
    params: { id: trackId },
    user: { firebase_id: userId },
  } = req;

  try {
    const dbResponse = await db.Track.findById(trackId);

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Track not found",
        }),
      );
    }

    return res.status(200).send(
      generateResponse({
        data: await buildTrack(userId, dbResponse),
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function getMyTracks(req, res, next) {
  const {
    query: { page = 1, size = 10 } = {},
    user: { firebase_id: userId },
  } = req;

  try {
    const totalTracks = await db.Track.countDocuments({ owner: userId });
    const totalPages = getTotalPages(totalTracks, size);
    const dbResponse = await db.Track.find({ owner: userId })
      .skip((parseInt(page) - 1) * parseInt(size))
      .limit(parseInt(size));

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Tracks not found",
        }),
      );
    }

    const allMyTracks = [];
    for (const track of dbResponse) {
      const trackData = await buildTrack(userId, track);
      if (trackData) {
        allMyTracks.push(trackData);
      }
    }

    return res.status(200).send(
      generateResponse({
        data: buildPaginatedData(size, page, totalPages, allMyTracks),
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function getMyLikedTracks(req, res, next) {
  try {
    const {
      query: { page = 1, size = 10 } = {},
      user: { firebase_id: userId },
    } = req;

    const totalLikeTracks = await db.LikeTrack.countDocuments({
      author: userId,
    });
    const totalPages = getTotalPages(totalLikeTracks, size);

    const likedTracks = await db.LikeTrack.find({ author: userId })
      .skip((parseInt(page) - 1) * parseInt(size))
      .limit(parseInt(size));

    const dbResponse = await db.Track.find({
      _id: { $in: likedTracks.map((track) => track.followed) },
    });

    if (dbResponse?.error) {
      return res.status(500).send(
        generateResponse({
          error: "Something went wrong",
        }),
      );
    }

    const myLikedTracks = [];
    for (const track of dbResponse) {
      const trackData = await buildTrack(userId, track);
      if (trackData) {
        myLikedTracks.push(trackData);
      }
    }

    return res.status(200).send(
      generateResponse({
        data: buildPaginatedData(size, page, totalPages, myLikedTracks),
      }),
    );
  } catch (err) {
    next(err);
  }
}

async function getTracksByUser(req, res, next) {
  const {
    query: { page = 1, size = 10 } = {},
    params: { id: userId },
    user: { firebase_id: requestUserId },
  } = req;

  try {
    const totalLikeTracks = await db.Track.countDocuments({ owner: userId });
    const totalPages = getTotalPages(totalLikeTracks, size);

    const dbResponse = await db.Track.find({ owner: userId })
      .skip((parseInt(page) - 1) * parseInt(size))
      .limit(parseInt(size));

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Tracks not found",
        }),
      );
    }
    const userTracks = [];
    for (const track of dbResponse) {
      const trackData = await buildTrack(requestUserId, track);
      if (trackData) {
        userTracks.push(trackData);
      }
    }
    return res.status(200).send(
      generateResponse({
        data: buildPaginatedData(size, page, totalPages, userTracks),
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function getTracksMix(req, res, next) {
  const {
    body: { tracks: trackIds },
    user: { firebase_id: userId },
  } = req;

  try {
    const dbResponse = await db.Track.find({ _id: { $in: trackIds } });

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Tracks not found",
        }),
      );
    }
    const tracks = [];
    for (const track of dbResponse) {
      const trackData = await buildTrack(userId, track);
      if (trackData) {
        tracks.push(trackData);
      }
    }
    const ThumbnailMix = /*tracks.length
      ? buildThumbnail(tracks.filter((track) => !!track.thumbnailUrl))
      : */ [];
    const tracksMix = { thumbnail: ThumbnailMix, tracks: tracks };
    return res.status(200).send(
      generateResponse({
        data: tracksMix,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function getTracks(req, res, next) {
  const {
    query: { page = 1, size = 10, name = "" } = {},
    user: { firebase_id: userId },
  } = req;

  try {
    const totalTracks = await db.Track.countDocuments({
      trackName: { $regex: name, $options: "i" },
    });
    const totalPages = getTotalPages(totalTracks, size);
    const dbResponse = await db.Track.find({
      trackName: { $regex: name, $options: "i" },
    })
      .skip((parseInt(page) - 1) * parseInt(size))
      .limit(parseInt(size));

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Tracks not found",
        }),
      );
    }

    const filteredTracks = [];
    for (const track of dbResponse) {
      const trackData = await buildTrack(userId, track);
      if (trackData) {
        filteredTracks.push(trackData);
      }
    }

    return res.status(200).send(
      generateResponse({
        data: buildPaginatedData(size, page, totalPages, filteredTracks),
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function updateTrack(req, res, next) {
  try {
    const { firebase_id: userId } = req.user;
    const dbResponse = await db.Track.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Unable to update Track",
        }),
      );
    }

    return res.status(200).send(
      generateResponse({
        data: await buildTrack(userId, dbResponse),
      }),
    );
  } catch (err) {
    next(err);
  }
}

async function deleteTrack(req, res, next) {
  try {
    const {
      params: { id: trackId },
    } = req;
    const dbResponse = await db.Track.findOneAndDelete({
      _id: trackId,
    });

    if (!dbResponse || dbResponse?.error) {
      return res.status(400).send(
        generateResponse({
          error: "Unable to delete Track",
        }),
      );
    }
    await db.LikeTrack.deleteMany({ followed: trackId });

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
  buildTrack: buildTrack,
  createTrack: createTrack,
  getTrack: getTrack,
  getMyTracks: getMyTracks,
  getMyLikedTracks: getMyLikedTracks,
  getTracksByUser: getTracksByUser,
  getTracksMix: getTracksMix,
  getTracks: getTracks,
  updateTrack: updateTrack,
  deleteTrack: deleteTrack,
};
