import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tweets: {
            keyArgs: [],
            merge(existing, incoming) {
              return {
                ...incoming,
                tweets: [...(existing?.tweets ?? []), ...incoming.tweets]
              };
            }
          }
        }
      }
    }
  })
  // credentials: 'include'
});

export default client;
