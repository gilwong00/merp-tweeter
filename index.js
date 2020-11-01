require('dotenv').config();
const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolves = require('./graphql/resolvers');
const PORT = process.env.port || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch(err =>
    console.log(colors.red(`Error connecting to mongo: ${err.message}`))
  );

const server = new ApolloServer({
  typeDefs,
  resolves,
  content: () => ({})
});

server.listen({ port: PORT });
