export const mockResponseAnimeList = {
  Page: {
    pageInfo: {
      total: 5000,
      perPage: 2,
      currentPage: 1,
      lastPage: 500,
      hasNextPage: true,
      __typename: "PageInfo",
    },
    media: [
      {
        id: 1,
        title: {
          romaji: "Cowboy Bebop",
          __typename: "MediaTitle",
        },
        coverImage: {
          medium:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-CXtrrkMpJ8Zq.png",
          __typename: "MediaCoverImage",
        },
        seasonYear: 1998,
        status: "FINISHED",
        episodes: 26,
        __typename: "Media",
      },
      {
        id: 5,
        title: {
          romaji: "Cowboy Bebop: Tengoku no Tobira",
          __typename: "MediaTitle",
        },
        coverImage: {
          medium:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx5-NozHwXWdNLCz.jpg",
          __typename: "MediaCoverImage",
        },
        seasonYear: 2001,
        status: "FINISHED",
        episodes: 1,
        __typename: "Media",
      },
    ],
    __typename: "Page",
  },
};
