const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    artist(id: String): Artist,
    album(id: String): Album,
    track(id: String): Track
  }

  type Artist {
    genres: [String],
    id: String,
    name: String,
    popularity: Int,
    type: String,
    uri: String,
    related_artists: [Artist],
    albums: [Album],
    top_tracks: [Track],
  }  

  type Album {
    album_type: String,
    artists: [Artist],
    available_markets: [String],
    genres: [String],
    id: String,
    label: String,
    name: String,
    popularity: Int,
    release_date: String,
    release_date_precision: String,
    tracks: [Track],
    type: String,
    uri: String,
  }

  type Track {
    album: Album,
    artists: [Artist],
    available_markets: [String],
    disc_number: Int,
    duration_ms: Int,
    explicit: Boolean,
    id: String,
    name: String,
    popularity: Int,
    track_number: Int,
    type: String,
    uri: String,
    audio_features: AudioFeatures
  }

  type AudioFeatures {
    key: Int,
    mode: Int,
    time_signature: Int,
    acousticness: Float,
    danceability: Float,
    energy: Float,
    instrumentalness: Float,
    liveness: Float,
    loudness: Float,
    speechiness: Float,
    valence: Float,
    tempo: Float,
    id: String,
    type: String
  }
`;