import { InMemoryCache } from '@apollo/client';
import { IPaginatedTweets } from 'Tweet';

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tweets: {
          keyArgs: [],
          // taking our incoming tweets and merging with our existing tweets for pagination
          merge(
            existing: IPaginatedTweets | undefined,
            incoming: IPaginatedTweets
          ) {
            return {
              ...incoming,
              tweets: [...(existing?.tweets ?? []), ...incoming.tweets]
            };
          }
        }
      }
    },
    User: {
      fields: {
        followers: {
          merge(_, incoming) {
            return incoming;
          }
        }
      }
    },
    Tweet: {
      fields: {
        likes: {
          merge(_, incoming) {
            return incoming;
          }
        },
        comments: {
          merge(_, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});
//.restore({ Query: { fields: { tweets: [] } } });

export default cache;
