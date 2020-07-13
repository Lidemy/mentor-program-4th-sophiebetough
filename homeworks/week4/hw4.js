const request = require('request');

request.get(
  {
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': '4jjphhdum2jypfqzd7hrli6cgf8rpr',
    },
  }, (error, response, body) => {
    let data;
    try {
      data = JSON.parse(body);
      for (let i = 0; i < data.top.length; i += 1) {
        console.log(`${data.top[i].viewers} ${data.top[i].game.name}`);
      }
    } catch (e) {
      console.log(e);
    }
  },
);
