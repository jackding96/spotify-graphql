const request = require('request-promise');

const CLIENT_ID = '5e5831321ddd4ffb891c76e0dff3a598';
const CLIENT_SECRET = 'b0c6e32fcb4b4027aa2a1793ac4baaca';

const getToken = require('./getToken')

module.exports = {
  Query: {
    artist(obj, args, context, info) {
      return new Promise((resolve, reject) => {
        getToken(CLIENT_ID, CLIENT_SECRET)
          .then((token) => {
            let options = {
              method: 'GET',
              url: `https://api.spotify.com/v1/artists/${args.id}`,
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
    },
    album(obj, args, context, info) {
      return new Promise((resolve, reject) => {
        getToken(CLIENT_ID, CLIENT_SECRET)
          .then((token) => {
            let options = {
              method: 'GET',
              url: `https://api.spotify.com/v1/albums/${args.id}`,
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
    },    
    track(obj, args, context, info) {
      return new Promise((resolve, reject) => {
        getToken(CLIENT_ID, CLIENT_SECRET)
          .then((token) => {
            console.log('Token!', token);
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

  Artist: {
    // genres: [String],
    // id: String,
    // name: String,
    // popularity: Int,
    // type: String,
    // uri: String,
    // related_artists: [Artist],
    related_artists(obj) {
      return new Promise((resolve, reject) => {
        getToken(CLIENT_ID, CLIENT_SECRET)
          .then((token) => {
            let options = {
              method: 'GET',
              url: `https://api.spotify.com/v1/artists/${obj.id}/related-artists`,
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              json: true
            };
            request(options)
              .then(r => {
                console.log(r.items);
                resolve(r.items);
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      });      
    },
    albums(obj) {
      return new Promise((resolve, reject) => {
        getToken(CLIENT_ID, CLIENT_SECRET)
          .then((token) => {
            let options = {
              method: 'GET',
              url: `https://api.spotify.com/v1/artists/${obj.id}/albums`,
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              json: true
            };
            request(options)
              .then(r => {
                console.log(r.items);
                resolve(r.items);

                // For each, get full album

              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      });       
    }
    // albums: [Album],
    // top_tracks: [Track],
  }, 

  Album: {
    // album_type: String,
    // artists: [Artist],
    // available_markets: [String],
    // genres: [String],
    // id: String,
    // label: String,
    // name: String,
    // popularity: Int,
    // release_date: String,
    // release_date_precision: String,
    // tracks: [Track],
    // type: String,
    // uri: String,
  },

  Track: {
    album(obj) {
      return new Promise((resolve, reject) => {
        getToken(CLIENT_ID, CLIENT_SECRET)
          .then((token) => {
            let options = {
              method: 'GET',
              url: `https://api.spotify.com/v1/albums/${obj.album.id}`,
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
    },
    // artists: [Artist],
    // available_markets: [String],
    // disc_number: Int,
    // duration_ms: Int,
    // explicit: Boolean,
    // id: String,
    // name: String,
    // popularity: Int,
    // track_number: Int,
    // type: String,
    // uri: String,
    audio_features(obj) {
      return new Promise((resolve, reject) => {
        getToken(CLIENT_ID, CLIENT_SECRET)
          .then((token) => {
            let options = {
              method: 'GET',
              url: `https://api.spotify.com/v1/audio-features/${obj.id}`,
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

  AudioFeatures: {
    // key: Int,
    // mode: Int,
    // time_signature: Int,
    // acousticness: Float,
    // danceability: Float,
    // energy: Float,
    // instrumentalness: Float,
    // liveness: Float,
    // loudness: Float,
    // speechiness: Float,
    // valence: Float,
    // tempo: Float,
    // id: String,
    // type: String
  }
};