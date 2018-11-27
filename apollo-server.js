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
    id: 1,
    name: 'Song 1',
    year: 2001,
  },
  {
    id: 2,
    name: 'Song 2',
    year: 2002,
  },
  {
    id: 3,
    name: 'Song 3',
    year: 2003,
  },    
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    getTrack(id: Int): Track
  }

  type Track {
    name: String,
    artist: Artist,
    year: Int
  }

  type Artist {
    name: String,
    genre: String,
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getTrack(obj, args, context, info) {
      return dummy[args.id];
    }
  },

  Track: {
    name(obj) {
      console.log('Track resolver', obj);
      return 'Blackbird';
    },
    artist(obj) {
      console.log('Track resolver', obj);
      return 'Hello'
    },
    year(obj) {
      console.log('Track resolver', obj);
      return 1969;
    }
  },

  Artist: {
    name(obj) {
      console.log('Artist resolver', obj);
      return 'John Lennon';
    },
    genre(obj) { 
      console.log('Artist resolver', obj);
      return 'Rock';
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);