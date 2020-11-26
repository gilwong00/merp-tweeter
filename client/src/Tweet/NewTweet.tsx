import React, { useContext } from 'react';
import { AppContext } from 'Context';
import { useMutation } from '@apollo/client';
import { CREATE_TWEET } from 'graphql/mutations/tweet';
import { GET_ALL_TWEETS } from 'graphql/queries/tweet';
import { ITweet } from 'Tweet';
import { FormControl, Input, Stack, Box, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as joi from 'joi';

interface ITweetInput {
  message: string;
}

const schema = joi.object({
  message: joi.string().required()
});

const NewTweet = () => {
  const { pushNotification, user } = useContext(AppContext);
  const [createTweet, { loading, error }] = useMutation(CREATE_TWEET, {
    update(cache, { data }): void {
      if (error) {
        return pushNotification('error', error.message);
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
            tweets
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
    if (!message) return pushNotification('error', 'You must enter something');

    await createTweet({
      variables: { message, username: user?.username, user: user?._id }
    });

    reset();
  };

  return (
    <Stack direction='column' spacing={2} align='center'>
      <Box
        borderWidth='1px'
        borderRadius='sm'
        overflow='hidden'
        p={5}
        align='center'
      >
        <form onSubmit={handleSubmit(postTweet)}>
          <FormControl w={600}>
            <Input
              type='text'
              name='message'
              mb={5}
              placeholder='Tweet something'
              ref={register({ required: true })}
            />
          </FormControl>

          <Button
            isLoading={loading}
            colorScheme='teal'
            type='submit'
            variant='solid'
            size='lg'
            w='100%'
          >
            Tweet
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default NewTweet;
