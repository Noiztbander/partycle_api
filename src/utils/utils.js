function shuffleArray(array) {
  return array.sort((a, b) => 0.5 - Math.random());
}

function buildThumbnail(items) {
  const shuffledTracks = shuffleArray(items);
  const thumbnailCount = items.length < 4 ? 1 : 4;
  return shuffledTracks.slice(0, thumbnailCount);
}

module.exports = {
  shuffleArray,
  buildThumbnail,
};
