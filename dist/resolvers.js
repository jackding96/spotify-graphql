"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
const getToken = require('./getToken');
const CLIENT_ID = '5e5831321ddd4ffb891c76e0dff3a598';
const CLIENT_SECRET = 'b0c6e32fcb4b4027aa2a1793ac4baaca';
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
            console.log(obj);
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
                        resolve(results);
                    })
                        .catch(err => reject(err));
                })
                    .catch(err => reject(err));
            });
        }
    },
    SearchResult: {
        __resolveType(obj, context, info) {
            if (obj.type == 'artist') {
                return 'Artist';
            }
            if (obj.type == 'album') {
                return 'Album';
            }
            if (obj.type == 'track') {
                return 'Track';
            }
        }
    },
    Artist: {
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
                        });
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
    AudioFeatures: {}
};
