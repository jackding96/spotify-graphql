var express = require('express');
var graphqlHTTP = require('express-graphql');
var app = express();
var schema = require('./schema');
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(3000);
console.log('Server listening on 3000!');
