const db = require("../models");
const {
  generateResponse,
  getTotalPages,
  buildPaginatedData,
} = require("../utils/responseUtils");
const { buildTrack } = require("./tracks-controller");
const { buildThumbnail } = require("../utils/utils");

async function buildPlaylist(userId, playlist) {
  try {
    const liked = await db.LikePlaylist.findOne({
      author: userId,
      followed: playlist.id,
    });
    const owner = await db.User.findOne({ firebase_id: playlist.owner });

    const tracksResponse = await db.Track.find({
      _id: { $in: playlist.tracks },
    });
    const tracks = [];
    for (const track of tracksResponse) {
      const trackData = await buildTrack(userId, track);
      if (trackData) {
        tracks.push(trackData);
      }
    }

    await db.Playlist.findByIdAndUpdate(playlist.id, {
      tracks: tracks.map((track) => track.id),
    });

    const likes = await db.LikePlaylist.find({
      followed: playlist.id,
    });

    const likers = await db.User.find({
      firebase_id: {
        $in: likes.map((like) => like.author),
      },
    });

    const likersThumbnail = likers.length
      ? buildThumbnail(likers.filter((liker) => !!liker.thumbnail))
      : [];

    return {
      id: playlist.id,
      name: playlist.name,
      owner: {
        id: playlist.owner,
        displayName: owner.displayName,
        picture: owner.picture ? owner.picture : "",
      },
      description: playlist.description,
      tracks: tracks,
      thumbnailUrl: playlist.thumbnailUrl,
      likersThumbnail: likersThumbnail,
      publicAccessible: playlist.publicAccessible,
      likes: likes.length,
      liked: !!liked,
    };
  } catch (err) {
    return null;
  }
}

async function createPlaylist(req, res, next) {
  const {
    body: {
      name,
      description = "",
      publicAccessible = true,
      tracks = [],
      thumbnailUrl = "",
    },
    user: { firebase_id: owner },
  } = req;
  try {
    const playlistResponse = await db.Playlist.create({
      name: name,
      owner: owner,
      description: description,
      tracks: tracks,
      thumbnailUrl: thumbnailUrl,
      publicAccessible: publicAccessible,
    });

    if (!playlistResponse || playlistResponse?.error) {
      return res.status(400).send(
        generateResponse({
          error: "Playlist's creation failed'",
        }),
      );
    }
    return res.status(201).send(
      generateResponse({
        data: await buildPlaylist(owner, playlistResponse),
      }),
    );
  } catch (err) {
    next(err);
  }
}

async function getPlaylist(req, res, next) {
  const {
    params: { id: playlistId },
    user: { firebase_id: userId },
  } = req;

  try {
    const playlistResponse = await db.Playlist.findById(playlistId);

    if (!playlistResponse || playlistResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Playlist not found",
        }),
      );
    }

    return res.status(200).send(
      generateResponse({
        data: await buildPlaylist(userId, playlistResponse),
      }),
    );
  } catch (err) {
    next(err);
  }
}

async function getMyPlaylists(req, res, next) {
  const {
    query: { page = 1, size = 10 } = {},
    user: { firebase_id: userId },
  } = req;
  try {
    const totalPlaylists = await db.Playlist.countDocuments({ owner: userId });
    const totalPages = getTotalPages(totalPlaylists, size);

    const dbResponse = await db.Playlist.find({ owner: userId })
      .skip((parseInt(page) - 1) * parseInt(size))
      .limit(parseInt(size));

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Playlists not found",
        }),
      );
    }

    const allMyPlaylists = [];
    for (const playlist of dbResponse) {
      const playlistData = await buildPlaylist(userId, playlist);
      if (playlistData) {
        allMyPlaylists.push(playlistData);
      }
    }

    return res.status(200).send(
      generateResponse({
        data: buildPaginatedData(size, page, totalPages, allMyPlaylists),
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function getMyLikedPlaylists(req, res, next) {
  try {
    const {
      query: { page = 1, size = 10 } = {},
      user: { firebase_id: userId },
    } = req;

    const totalLikePlaylists = await db.LikePlaylist.countDocuments({
      author: userId,
    });
    const totalPages = getTotalPages(totalLikePlaylists, size);

    const likedPlaylists = await db.LikePlaylist.find({ author: userId })
      .skip((parseInt(page) - 1) * parseInt(size))
      .limit(parseInt(size));

    const dbResponse = await db.Playlist.find({
      _id: { $in: likedPlaylists.map((playlist) => playlist.followed) },
    });

    if (dbResponse?.error) {
      return res.status(500).send(
        generateResponse({
          error: "Something went wrong",
        }),
      );
    }

    const myLikedPlaylists = [];
    for (const playlist of dbResponse) {
      const playlistData = await buildPlaylist(userId, playlist);
      if (playlistData) {
        myLikedPlaylists.push(playlistData);
      }
    }

    return res.status(200).send(
      generateResponse({
        data: buildPaginatedData(size, page, totalPages, myLikedPlaylists),
      }),
    );
  } catch (err) {
    next(err);
  }
}

async function getPlaylistsByUser(req, res, next) {
  const {
    query: { page = 1, size = 10 } = {},
    params: { id: userId },
    user: { firebase_id: requestUserId },
  } = req;

  try {
    const totalLikePlaylists = await db.Playlist.countDocuments({
      owner: userId,
    });
    const totalPages = getTotalPages(totalLikePlaylists, size);

    const dbResponse = await db.Playlist.find({ owner: userId })
      .skip((parseInt(page) - 1) * parseInt(size))
      .limit(parseInt(size));

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Playlists not found",
        }),
      );
    }

    const userPlaylists = [];
    for (const playlist of dbResponse) {
      const playlistData = await buildPlaylist(requestUserId, playlist);
      if (playlistData) {
        userPlaylists.push(playlistData);
      }
    }

    return res.status(200).send(
      generateResponse({
        data: buildPaginatedData(size, page, totalPages, userPlaylists),
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function getPlaylistsMix(req, res, next) {
  const {
    body: { playlists: playlistIds },
    user: { firebase_id: userId },
  } = req;

  try {
    const dbResponse = await db.Playlist.find({ _id: { $in: playlistIds } });

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Playlists not found",
        }),
      );
    }
    const playlists = [];
    for (const playlist of dbResponse) {
      const playlistData = await buildPlaylist(userId, playlist);
      if (playlistData) {
        playlists.push(playlistData);
      }
    }
    const ThumbnailMix = playlists.length
      ? buildThumbnail(playlists.filter((playlist) => !!playlist.thumbnailUrl))
      : [];
    const playlistsMix = { thumbnail: ThumbnailMix, playlists: playlists };
    return res.status(200).send(
      generateResponse({
        data: playlistsMix,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function getPlaylists(req, res, next) {
  const {
    query: { page = 1, size = 10, name = "" } = {},
    user: { firebase_id: userId },
  } = req;

  try {
    const totalPlaylists = await db.Playlist.countDocuments({
      name: { $regex: name, $options: "i" },
    });
    const totalPages = getTotalPages(totalPlaylists, size);
    const dbResponse = await db.Playlist.find({
      name: { $regex: name, $options: "i" },
    })
      .skip((parseInt(page) - 1) * parseInt(size))
      .limit(parseInt(size));

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Playlists not found",
        }),
      );
    }

    const filteredPlaylists = [];
    for (const playlist of dbResponse) {
      const playlistData = await buildPlaylist(userId, playlist);
      if (playlistData) {
        filteredPlaylists.push(playlistData);
      }
    }

    return res.status(200).send(
      generateResponse({
        data: buildPaginatedData(size, page, totalPages, filteredPlaylists),
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function updatePlaylist(req, res, next) {
  try {
    const dbResponse = await db.Playlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Unable to update Playlist",
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

async function addTrackToPlaylist(req, res, next) {
  try {
    const {
      params: { id: playlistId, trackId },
      user: { firebase_id: userId },
    } = req;
    const playlistResponse = await db.Playlist.findById(playlistId);

    if (!playlistResponse || playlistResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Playlist not found",
        }),
      );
    }

    const trackResponse = await db.Track.findById(trackId);

    if (!trackResponse || trackResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Track not found",
        }),
      );
    }

    playlistResponse.tracks.push(trackId);

    const updatedPlaylist = await db.Playlist.findByIdAndUpdate(
      playlistId,
      {
        tracks: playlistResponse.tracks,
      },
      { new: true },
    );

    return res.status(200).send(
      generateResponse({
        data: await buildPlaylist(userId, updatedPlaylist),
      }),
    );
  } catch (err) {
    next(err);
  }
}

async function removeTrackFromPlaylist(req, res, next) {
  try {
    const {
      params: { id: playlistId, trackId },
      user: { firebase_id: userId },
    } = req;
    const playlistResponse = await db.Playlist.findById(playlistId).lean();

    if (!playlistResponse || playlistResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Playlist not found",
        }),
      );
    }

    const trackResponse = await db.Track.findById(trackId);

    if (!trackResponse || trackResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Track not found",
        }),
      );
    }

    const updatedTracks = playlistResponse.tracks.filter(
      (track) => track.toString() !== trackId,
    );

    const updatedPlaylist = await db.Playlist.findByIdAndUpdate(
      playlistId,
      {
        tracks: updatedTracks,
      },
      { new: true },
    );

    return res.status(200).send(
      generateResponse({
        data: await buildPlaylist(userId, updatedPlaylist),
      }),
    );
  } catch (err) {
    next(err);
  }
}

async function deletePlaylist(req, res, next) {
  try {
    const dbResponse = await db.Playlist.findOneAndDelete({
      _id: req.params.id,
    });

    if (!dbResponse || dbResponse?.error) {
      return res.status(400).send(
        generateResponse({
          error: "Unable to delete Playlist",
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
  createPlaylist: createPlaylist,
  getPlaylist: getPlaylist,
  getMyPlaylists: getMyPlaylists,
  getMyLikedPlaylists: getMyLikedPlaylists,
  getPlaylistsByUser: getPlaylistsByUser,
  getPlaylistsMix: getPlaylistsMix,
  getPlaylists: getPlaylists,
  updatePlaylist: updatePlaylist,
  addTrackToPlaylist: addTrackToPlaylist,
  removeTrackFromPlaylist: removeTrackFromPlaylist,
  deletePlaylist: deletePlaylist,
};
