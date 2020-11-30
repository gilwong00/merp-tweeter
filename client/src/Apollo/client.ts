import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { cache } from '.';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
  connectToDevTools: true
});

export default client;
