// SPOTIFY OBJECT MODELS

const typeDefs = gql`
  type Query {
    getTrack(id: String): Track
  }

  type Album {
    album_type: String,
    artists: [Artist],
    available_markets: [String]
  }

  type Track {
    name: String,
    artists: [Artist],
  }

  type Artist {
    name: String,
  }
`;