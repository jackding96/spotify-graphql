const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// Types and resolvers
const typeDefs = require('./types');
const resolvers = require('./resolvers');
// Get up GraphQL and Express server
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => console.log(`Server ready at http://localhost:4000${server.graphqlPath}`));
