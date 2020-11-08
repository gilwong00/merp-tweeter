import { InMemoryCache } from '@apollo/client';

const cache: InMemoryCache = new InMemoryCache({
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
});

export default cache;
