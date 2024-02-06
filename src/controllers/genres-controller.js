const { Genre } = require("../models");
const { generateResponse } = require("../utils/responseUtils");

async function getGenres(req, res, next) {
  try {
    const dbResponse = await Genre.find({});

    if (!dbResponse || dbResponse?.error) {
      return res.status(404).send(
        generateResponse({
          error: "Genres not found",
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

async function seedGenres(req, res, next) {
  try {
    const genres = [
      { name: "Pop" },
      { name: "Rock" },
      { name: "Clásica" },
      { name: "Rap" },
      { name: "Techno" },
      { name: "Reggeaton" },
    ];

    const dbResponse = await Genre.find({});

    if (dbResponse?.error) {
      return res.status(400).send(
        generateResponse({
          error: "Genres operation failed",
        }),
      );
    }

    if (dbResponse?.length) {
      return res.status(200).send(
        generateResponse({
          data: "Genres already exists",
        }),
      );
    }

    const createResponse = await Genre.create(genres);
    if (createResponse?.error) {
      return res.status(400).send(
        generateResponse({
          error: "Genres not created",
        }),
      );
    }

    return res.status(201).send(
      generateResponse({
        data: "Genres created",
      }),
    );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGenres: getGenres,
  seedGenres: seedGenres,
};
