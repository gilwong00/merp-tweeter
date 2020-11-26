import React, { useContext } from 'react';
import { AppContext } from 'Context';
import { gql, useMutation } from '@apollo/client';
import { CREATE_TWEET } from 'graphql/mutations/tweet';
import { ITweet } from 'Tweet';
import {
  FormControl,
  Input,
  Stack,
  Box,
  Button,
  FormErrorMessage
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as joi from 'joi';
interface ITweetInput {
  message: string;
}

const schema = joi.object({
  message: joi.string().required().min(5)
});

const NewTweet = () => {
  const { pushNotification, user } = useContext(AppContext);
  const [createTweet, { loading, error }] = useMutation(CREATE_TWEET, {
    update(cache, { data }): void {
      if (error) {
        return pushNotification('error', error.message);
      } else {
        cache.modify({
          fields: {
            tweets(existingTweets: Array<ITweet> = []) {
              const newTweetRef = cache.writeFragment({
                data: { __typename: 'Tweet', ...data.createTweet },
                fragment: gql`
                  fragment newTweet on Tweet {
                    _id
                    message
                    dateCreated
                    comments
                    likes {
                      _id
                      username
                      dateCreated
                    }
                  }
                `
              });

              return [newTweetRef, ...existingTweets];
            }
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

  const hasFormErrors =
    ((errors && errors['message']?.message) ?? '').length > 0;

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
          <FormControl w={600} isInvalid={hasFormErrors}>
            <Input
              type='text'
              name='message'
              mb={5}
              placeholder='Tweet something'
              ref={register({ required: true })}
            />
            <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
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
