const express = require('express');
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

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type TrackType {
    name: String
  }

  type Query {
    track: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    track(obj, args, context, info) {
      getToken()
      return 'Hello!'
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);