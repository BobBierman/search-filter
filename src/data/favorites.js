const favoritesData = {
  news_red: {
    type: 'I',
    sites: [
      {
        id: 111,
        name: 'Fox News',
        url: 'foxnews.com',
        filter: true,
      },
      {
        id: 112,
        name: 'Newsmax',
        url: 'newsmax.com',
        filter: true,
      },
      {
        id: 113,
        name: 'American Spectator',
        url: 'spectator.org',
        filter: true,
      },
      {
        id: 114,
        name: 'American Thinker',
        url: 'americanthinker.com',
        filter: true,
      },
    ],
  },
  news_blue: {
    type: 'I',
    sites: [
      {
        id: 211,
        name: 'NY times',
        url: 'nytimes.com',
        filter: true,
      },
      {
        id: 212,
        name: 'CNN',
        url: 'cnn.com',
        filter: true,
      },
      {
        id: 213,
        name: 'MSNBC',
        url: 'msnbc.com',
        filter: true,
      },
      {
        id: 214,
        name: 'WaPo',
        url: 'washingtonpost.com',
        filter: true,
      },
    ],
  },
  sports_incl: {
    type: 'I',
    sites: [
      {
        id: 311,
        name: 'NASCAR',
        url: 'nascar.com',
        filter: true,
      },
      {
        id: 312,
        name: 'Sporting News',
        url: 'sportingnews.com',
        filter: true,
      },
    ],
  },
  sports_excl: {
    type: 'E',
    sites: [
      {
        id: 411,
        name: 'ESPN',
        url: 'espn.com',
        filter: true,
      },
      {
        id: 412,
        name: 'CBS Sports',
        url: 'cbssports.com',
        filter: true,
      },
      {
        id: 413,
        name: 'NBC Sports',
        url: 'nbcsports.com',
        filter: true,
      },
    ],
  },
  coding_include: {
    type: 'I',
    sites: [
      {
        id: 511,
        name: 'Stack Overflow',
        url: 'stackoverflow.com',
        filter: true,
      },
      {
        id: 512,
        name: 'DZone',
        url: 'dzone.com',
        filter: true,
      },
      {
        id: 513,
        name: 'Baeldung',
        url: 'baeldung.com',
        filter: true,
      },
      {
        id: 514,
        name: 'Mkyong',
        url: 'mkyong.com',
        filter: true,
      },
    ],
  },
  shopping_in: {
    type: 'I',
    sites: [
      {
        id: 611,
        name: 'Amazon',
        url: 'amazon.com',
        filter: true,
      },
      {
        id: 612,
        name: 'Rock Auto',
        url: 'rockauto.com',
        filter: true,
      },
    ],
  },
  shopping_ex: {
    type: 'E',
    sites: [
      {
        id: 711,
        name: 'Wayfair',
        url: 'wayfair.com',
        filter: true,
      },
      {
        id: 712,
        name: 'Sears',
        url: 'sears.com',
        filter: true,
      },
    ],
  },
};

export default favoritesData;
