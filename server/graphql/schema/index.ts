import typeDefs from '../typeDefs';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolvers';
import { GraphQLSchema } from 'graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
