import * as request from 'request-promise';
const getToken = require('./getToken');

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
    },
    search(obj, args, context, info) {
      return new Promise((resolve, reject) => {
        getToken(CLIENT_ID, CLIENT_SECRET)
          .then((token) => {
            let options = {
              method: 'GET',
              url: `https://api.spotify.com/v1/search/`,
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              qs: {
                q: args.q,
                type: args.type
              },
              json: true
            };  
            request(options)
              .then(r => {
                const results = (r.artists ? r.artists.items : []).concat(r.albums ? r.albums.items : []).concat(r.tracks ? r.tracks.items : []);
                resolve(results)
              })
              .catch(err => reject(err));                      
          })
          .catch(err => reject(err))
      });
    }
  },

  SearchResult: {
    __resolveType(obj, context, info) {
      if (obj.type == 'artist') {
        return 'Artist'
      }
      if (obj.type == 'album') {
        return 'Album'
      }
      if (obj.type == 'track') {
        return 'Track'
      }
    }
  },

  Artist: {
    // genres: [String],
    // id: String,
    // name: String,
    // popularity: Int,
    // type: String,
    // uri: String,
    related_artists(obj, args, context, info) {
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
                const albumPromises = r.items.map((item) => {
                  let albumOptions = {
                    method: 'GET',
                    url: `https://api.spotify.com/v1/albums/${item.id}`,
                    headers: {
                      'Authorization': `Bearer ${token}`,
                    },
                    json: true
                  };
                  return request(albumOptions);            
                });
                Promise.all(albumPromises).then((albums) => { 
                  resolve(albums);
                })
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      });       
    },
    top_tracks(obj, args, context, info) {
      return new Promise((resolve, reject) => {
        getToken(CLIENT_ID, CLIENT_SECRET)
          .then((token) => {
            let options = {
              method: 'GET',
              url: `https://api.spotify.com/v1/artists/${obj.id}/top-tracks`,
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              qs: {
                market: args.market,
              },
              json: true
            };
            request(options)
              .then(r => {
                resolve(r.tracks);
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      });      
    }
  }, 

  Album: {
    // album_type: String,
    // artists: [Artist],
    artists(obj) {
      return new Promise((resolve, reject) => {
        getToken(CLIENT_ID, CLIENT_SECRET)
          .then((token) => {
            const artistPromises = obj.artists.map((artist) => {
              let options = {
                method: 'GET',
                url: `https://api.spotify.com/v1/artists/${artist.id}`,
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
                json: true
              };
              return request(options);
            });
      
            Promise.all(artistPromises).then((artists) => {
              resolve(artists);
            })
            .catch(err => reject(err));
          })
          .catch(err => reject(err));
      });    
    },
    // available_markets: [String],
    // genres: [String],
    // id: String,
    // label: String,
    // name: String,
    // popularity: Int,
    // release_date: String,
    // release_date_precision: String,
    tracks(obj) {
      return new Promise((resolve, reject) => {
        getToken(CLIENT_ID, CLIENT_SECRET)
          .then((token) => {
            let options = {
              method: 'GET',
              url: `https://api.spotify.com/v1/albums/${obj.id}/tracks`,
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              json: true
            };
            request(options)
              .then(r => {
                const trackPromises = r.items.map((track) => {
                  let options = {
                    method: 'GET',
                    url: `https://api.spotify.com/v1/tracks/${track.id}`,
                    headers: {
                      'Authorization': `Bearer ${token}`,
                    },
                    json: true
                  };
                  return request(options);
                });
          
                Promise.all(trackPromises).then((tracks) => {
                  resolve(tracks);
                })
                .catch(err => reject(err));                
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      });       
    }
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