import 'dotenv-safe/config';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import colors from 'colors';
import schema from './server/graphql/schema';

const PORT = process.env.port || 5000;

const startServer = async () => {
  const app = express();
  app.use(
    cors({
      credentials: true,
      origin:
        process.env.NODE_ENV === 'production'
          ? 'prod url'
          : 'http://localhost:3000'
    })
  );
  app.use(cookieParser());
  app.use(
    cookieSession({
      name: 'session',
      keys: ['secret key'],
      httpOnly: true,
      maxAge: 4 * 60 * 60 * 1000 // 4 hours
    })
  );

  mongoose
    .connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: process.env.NODE_ENV !== 'production'
    })
    .catch(err =>
      console.log(colors.red(`Error connecting to mongo: ${err.message}`))
    );

  const server = new ApolloServer({
    schema,
    playground: true,
    context: ({ req, res }) => ({
      req,
      res
    })
  });

  server.applyMiddleware({
    app,
    cors: false,
    path: '/graphql'
  });

  app.listen({ port: PORT }, (): void => {
    console.log(
      `\n🚀  GraphQL is now running on http://localhost:${PORT}/graphql`
    );
  });
};

startServer().catch(err =>
  console.error(colors.red(`Error starting server ${err.message}`))
);
