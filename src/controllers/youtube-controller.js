const { config } = require("../config");
const axios = require("axios");
const { generateResponse } = require("../utils/responseUtils");

const fakeYoutubeSearchResponse = {
  data: {
    kind: "youtube#searchListResponse",
    etag: "zbXOBlUhq5Sy__gbrlzTZwNwzkA",
    // nextPageToken: "CAUQAA",
    regionCode: "ES",
    pageInfo: {
      totalResults: 18,
      resultsPerPage: 5,
    },
    items: [
      {
        kind: "youtube#searchResult",
        etag: "-i7VcAV-fX4zZ6aB3t2MkTq12xU",
        id: {
          kind: "youtube#video",
          videoId: "HqjABnxQvDo",
        },
        snippet: {
          publishedAt: "2020-06-15T13:55:35Z",
          channelId: "UCzw-F6vXeIHs66udO0e7i-A",
          title: "3D Demo reel 2020: Erick Noiztbander",
          description:
            "Here I show some of my works done this past years. I'm owner of all assets showed. If want to see more search for: artstation.com/erick_noiztbander ...",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/HqjABnxQvDo/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/HqjABnxQvDo/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/HqjABnxQvDo/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Erick Noiztbander Ureña Lino",
          liveBroadcastContent: "none",
          publishTime: "2020-06-15T13:55:35Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "B7uE59KyJjuWf0f3LifayzO6Zk8",
        id: {
          kind: "youtube#video",
          videoId: "PR-0z1D59JY",
        },
        snippet: {
          publishedAt: "2017-11-28T16:10:13Z",
          channelId: "UCzw-F6vXeIHs66udO0e7i-A",
          title: "Demoreel Erick Noiztbander 2016",
          description: "",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/PR-0z1D59JY/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/PR-0z1D59JY/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/PR-0z1D59JY/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Erick Noiztbander Ureña Lino",
          liveBroadcastContent: "none",
          publishTime: "2017-11-28T16:10:13Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "maDqHlAGtpW6ywOGJZpFxs9UUuo",
        id: {
          kind: "youtube#video",
          videoId: "-ZcU0iEOn9g",
        },
        snippet: {
          publishedAt: "2021-03-06T22:25:54Z",
          channelId: "UCzw-F6vXeIHs66udO0e7i-A",
          title: "NEOIZT intro background",
          description: "",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/-ZcU0iEOn9g/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/-ZcU0iEOn9g/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/-ZcU0iEOn9g/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Erick Noiztbander Ureña Lino",
          liveBroadcastContent: "none",
          publishTime: "2021-03-06T22:25:54Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "4I7D76Z_oFSP7J04_pknU9G92CY",
        id: {
          kind: "youtube#video",
          videoId: "qqJnZ7bMtac",
        },
        snippet: {
          publishedAt: "2020-06-13T20:15:52Z",
          channelId: "UCzw-F6vXeIHs66udO0e7i-A",
          title: "3D character: Wiflow",
          description:
            "3D character I was workig on this quarantine 2020. It is inspired on a friend of mine just for fun. I put on it my magical touch. This was done on Zbrush, painted on ...",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/qqJnZ7bMtac/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/qqJnZ7bMtac/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/qqJnZ7bMtac/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Erick Noiztbander Ureña Lino",
          liveBroadcastContent: "none",
          publishTime: "2020-06-13T20:15:52Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "diMYMkbMcMm7ERWg3plFbDpm7l8",
        id: {
          kind: "youtube#video",
          videoId: "pLXpw8YMI3s",
        },
        snippet: {
          publishedAt: "2021-03-06T21:01:39Z",
          channelId: "UCzw-F6vXeIHs66udO0e7i-A",
          title: "NEOIZT intro background 03",
          description: "",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/pLXpw8YMI3s/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/pLXpw8YMI3s/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/pLXpw8YMI3s/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Erick Noiztbander Ureña Lino",
          liveBroadcastContent: "none",
          publishTime: "2021-03-06T21:01:39Z",
        },
      },
    ],
  },
};

const fakeYoutubeVideoResponse = {
  data: {
    kind: "youtube#videoListResponse",
    etag: "7Zeoan3DJWB_fBPlM6qMtsUuqDc",
    items: [
      {
        kind: "youtube#video",
        etag: "xTuB8X62pLreBoXLRQyQONVXCy0",
        id: "HqjABnxQvDo",
        statistics: {
          viewCount: "66",
          likeCount: "2",
          dislikeCount: "0",
          favoriteCount: "0",
          commentCount: "0",
        },
        player: {
          embedHtml:
            '\u003ciframe width="480" height="270" src="//www.youtube.com/embed/HqjABnxQvDo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\u003e\u003c/iframe\u003e',
        },
      },
    ],
    pageInfo: {
      totalResults: 1,
      resultsPerPage: 1,
    },
  },
};

const fakeYoutubeChannelResponse = {
  data: {
    kind: "youtube#channelListResponse",
    etag: "p95RzI7xaELYrB5PDHhmAUhpBnk",
    pageInfo: {
      totalResults: 1,
      resultsPerPage: 5,
    },
    items: [
      {
        kind: "youtube#channel",
        etag: "4eDelZA0uSp63qUE6iIflsVmVtw",
        id: "UCzw-F6vXeIHs66udO0e7i-A",
        snippet: {
          title: "Erick Noiztbander Ureña Lino",
          description: "",
          publishedAt: "2015-03-29T13:20:33Z",
          thumbnails: {
            default: {
              url: "https://yt3.ggpht.com/ytc/AKedOLSmTCE5X40X6EH6BiZf6xDaxN38aC6pjP0tDSxxSA=s88-c-k-c0x00ffffff-no-rj",
              width: 88,
              height: 88,
            },
            medium: {
              url: "https://yt3.ggpht.com/ytc/AKedOLSmTCE5X40X6EH6BiZf6xDaxN38aC6pjP0tDSxxSA=s240-c-k-c0x00ffffff-no-rj",
              width: 240,
              height: 240,
            },
            high: {
              url: "https://yt3.ggpht.com/ytc/AKedOLSmTCE5X40X6EH6BiZf6xDaxN38aC6pjP0tDSxxSA=s800-c-k-c0x00ffffff-no-rj",
              width: 800,
              height: 800,
            },
          },
          localized: {
            title: "Erick Noiztbander Ureña Lino",
            description: "",
          },
        },
      },
    ],
  },
};

async function buildYoutubeTrack(track) {
  try {
    const { channelId, title, channelTitle, publishedAt, description } =
      track.snippet;
    const trackThumbnail = track.snippet.thumbnails.high.url;
    const trackId = track.id.videoId;

    // get channel/user information
    const channelSearchUrl = `${config.youtube.searchUri}/channels?key=${config.youtube.apiKey}&part=snippet&id=${channelId}`;
    const youtubeChannelResponse = await axios.get(channelSearchUrl);
    // const youtubeChannelResponse = fakeYoutubeChannelResponse;
    const ownerPicture =
      youtubeChannelResponse.data.items[0].snippet.thumbnails.medium.url;

    // get track url information
    const videoSearchUrl = `${config.youtube.searchUri}/videos?key=${config.youtube.apiKey}&part=player&part=statistics&id=${trackId}`;
    const youtubeVideoResponse = await axios.get(videoSearchUrl);
    // const youtubeVideoResponse = fakeYoutubeVideoResponse;
    const trackUrl = youtubeVideoResponse.data.items[0].player.embedHtml;
    const likes = youtubeVideoResponse.data.items[0].statistics.likeCount;

    return {
      id: trackId,
      trackName: title,
      owner: {
        id: channelId,
        displayName: channelTitle,
        picture: ownerPicture ? ownerPicture : "",
      },
      released: publishedAt ? publishedAt : "",
      // genre: genre ? genre.name : "",
      description: description,
      trackUrl: trackUrl,
      thumbnailUrl: trackThumbnail,
      publicAccessible: true,
      likes: likes,
      // liked: !!liked,
    };
  } catch (error) {
    return null;
  }
}

async function getYoutubeSearch(req, res, next) {
  try {
    const { query_search, maxResults, pageToken } = req.query;

    const baseUrl = `${config.youtube.searchUri}/search?key=${config.youtube.apiKey}&type=video&part=snippet&q=${query_search}&maxResults=${maxResults}&pageToken=${pageToken}`;

    const youtubeResponse = await axios.get(baseUrl);
    // const youtubeResponse = fakeYoutubeSearchResponse;
    const allFoundedTracks = [];
    for (const track of youtubeResponse.data.items) {
      const trackData = await buildYoutubeTrack(track);
      if (trackData) {
        allFoundedTracks.push(trackData);
      }
    }

    return res.status(200).send(
      generateResponse({
        data: {
          items: allFoundedTracks,
          nextPageToken: youtubeResponse.data.nextPageToken
            ? (nextPageToken = youtubeResponse.data.nextPageToken)
            : "",
        },
      }),
    );
    // return res.status(200).send(
    //   generateResponse({
    //     data: {
    //       items: youtubeResponse.data,
    //     },
    //   }),
    // );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getYoutubeSearch: getYoutubeSearch,
};
