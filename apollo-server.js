const express = require('express');
const request = require('request-promise');
const { ApolloServer, gql } = require('apollo-server-express');

const CLIENT_ID = '5e5831321ddd4ffb891c76e0dff3a598';
const CLIENT_SECRET = 'b0c6e32fcb4b4027aa2a1793ac4baaca';

async function getToken(CLIENT_ID, CLIENT_SECRET) {
  return new Promise((resolve, reject) => {    
    let authOptions = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };
    request(authOptions)
      .then((res) => { resolve(res.access_token) })
      .catch((err) => { reject(err) });
  });
}

const dummy = [
  {
    na: 'Song 1',
    year: 2001,
  },
  {
    na: 'Song 2',
    year: 2002,
  },
  {
    na: 'Song 3',
    year: 2003,
  },    
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Track {
    name: String,
    year: Int
  }

  type Query {
    getTrack: Track
    allTracks: [Track]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getTrack() {
      return {
        name: dummy[0].na,
        year: dummy[0].year
      };
    },
    allTracks() {
      return dummy;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);