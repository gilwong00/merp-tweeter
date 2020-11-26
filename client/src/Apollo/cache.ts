import { InMemoryCache } from '@apollo/client';

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tweets: {
          keyArgs: [],
          // taking our incoming tweets and merging with our existing tweets for pagination
          merge(existing, incoming) {
            return [...(existing ?? []), ...incoming];
          }
        }
      }
    }
  }
});

export default cache;
