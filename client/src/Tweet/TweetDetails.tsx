import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_TWEET } from 'graphql/queries/tweet';
import { useQuery } from '@apollo/client';

const TweetDetails = () => {
  const { tweetId } = useParams<{ tweetId: string }>();
  const { loading, error, data } = useQuery(GET_TWEET, {
    variables: { tweetId }
  });

  console.log('data', data);
  return <div></div>;
};

export default TweetDetails;
