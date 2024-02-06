const express = require("express");
const helmet = require("helmet");
const { json } = require("body-parser");
const cors = require("cors");

const {
  usersRouter,
  accountsRouter,
  tracksRouter,
  playlistsRouter,
  socialRouter,
  genresRouter,
  youtubeRouter
} = require("./routes");

const { errorMiddleware } = require("./middleware");
const { config } = require("./config/config");
const app = express();

app.use(helmet());
app.use(json());
app.use(
  cors({
    origin: config.client.URL,
  }),
);

app.use("/api-music/accounts", accountsRouter);
app.use("/api-music/genres", genresRouter);
app.use("/api-music/playlists", playlistsRouter);
app.use("/api-music/tracks", tracksRouter);
app.use("/api-music/socials", socialRouter);
app.use("/api-music/users", usersRouter);
app.use("/api-music/youtube", youtubeRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    data: "hello-world",
  });
});

app.use(errorMiddleware);

module.exports = app;
