const request = require('request-promise');

const CLIENT_ID = '5e5831321ddd4ffb891c76e0dff3a598';
const CLIENT_SECRET = 'b0c6e32fcb4b4027aa2a1793ac4baaca';

const getToken = require('./getToken')

module.exports = {
  Query: {
    track(obj, args, context, info) {
      return new Promise((resolve, reject) => {
        getToken(CLIENT_ID, CLIENT_SECRET)
          .then((token) => {
            let options = {
              method: 'GET',
              url: `https://api.spotify.com/v1/tracks/${args.id}`,
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              json: true
            };
            request(options)
              .then(r => resolve(r))
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      });
    }
  },

  Track: {
    name(obj) {
      return obj.name;
    },
    artists(obj) {
      return obj.artists;
    },
  },

  Artist: {
    name(obj) {
      return obj.name;
    },
  }
};