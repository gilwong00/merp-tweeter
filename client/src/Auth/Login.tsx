import React, { useContext } from 'react';
import { AppContext } from 'Context';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_USER } from 'graphql/mutations/user';
import { WHO_AM_I } from 'graphql/queries/user';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as joi from 'joi';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Box,
  Button,
  Flex
} from '@chakra-ui/react';

interface IFormInputs {
  username: string;
  password: string;
}

const schema = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
});

const Login = () => {
  const { pushNotification } = useContext(AppContext);
  const history = useHistory();
  const [authUser, { loading, error }] = useMutation(AUTH_USER, {
    update(cache, { data }) {
      if (error) {
        pushNotification('error', `Could not log in ${JSON.stringify(error)}`);
      } else {
        cache.writeQuery({
          query: WHO_AM_I,
          data: {
            __typename: 'Query',
            user: data?.authUser
          }
        });
        cache.evict({ fieldName: 'tweets: {}' });
        pushNotification('success', `Welcome ${data?.authUser.username}`);
        history.push('/');
      }
    }
  });

  const { register, handleSubmit, errors, reset } = useForm<IFormInputs>({
    resolver: joiResolver(schema)
  });

  const onSubmit = async (data: IFormInputs) => {
    const { username, password } = data;

    if (username && password) {
      await authUser({ variables: { username, password } });
      reset();
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl w={600}>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              name='username'
              mb={5}
              ref={register({ required: true })}
            />
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              name='password'
              ref={register({ required: true })}
            />
          </FormControl>
          <Flex justify='flex-end' mt={5}>
            <Button isLoading={loading} colorScheme='teal' type='submit'>
              Login
            </Button>
          </Flex>
        </form>
      </Box>
    </Stack>
  );
};

export default Login;
