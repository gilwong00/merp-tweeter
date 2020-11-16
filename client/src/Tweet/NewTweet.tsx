import React, { useContext } from 'react';
import { AppContext } from 'Context';
import { useMutation } from '@apollo/client';
import { CREATE_TWEET } from 'graphql/mutations/tweet';
import { GET_ALL_TWEETS } from 'graphql/queries/tweet';
import { ITweet } from 'Tweet';
import { Segment, Form, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as joi from 'joi';
import styled from 'styled-components';
interface ITweetInput {
  message: string;
}

const schema = joi.object({
  message: joi.string().required()
});

const TweetWrapper = styled(Segment)`
  width: 400px;
  margin: auto !important;
`;

const TweetButton = styled(Button)`
  margin-top: 15px !important;
`;

const NewTweet = () => {
  const { pushNotification, user } = useContext(AppContext);
  const [createTweet, { loading, error }] = useMutation(CREATE_TWEET, {
    update(cache, { data }) {
      if (error) {
        pushNotification('error', error.message);
      } else {
        const currentTweets = cache.readQuery({
          query: GET_ALL_TWEETS,
          variables: { offset: 0 }
        }) as { tweets: Array<ITweet> };

        const tweets = [data.createTweet, ...currentTweets.tweets];
        cache.writeQuery({
          query: GET_ALL_TWEETS,
          variables: { offset: 0 },
          data: {
            __typename: 'Query',
            tweets: tweets
          }
        });
      }
    }
  });

  const { register, handleSubmit, errors, reset } = useForm<ITweetInput>({
    resolver: joiResolver(schema)
  });

  const postTweet = async (data: ITweetInput) => {
    const { message } = data;
    await createTweet({
      variables: { message, username: user?.username, user: user?._id }
    });
    reset();
  };

  return (
    <TweetWrapper>
      <Form noValidate onSubmit={handleSubmit(postTweet)}>
        <input
          type='text'
          name='message'
          placeholder='Tweet something'
          ref={register({ required: true })}
        />
        <TweetButton
          content='Tweet'
          color='teal'
          fluid={true}
          loading={loading}
        />
      </Form>
    </TweetWrapper>
  );
};

export default NewTweet;
