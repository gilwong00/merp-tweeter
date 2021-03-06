import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_USER } from 'graphql/mutations/user';
import { WHO_AM_I } from 'graphql/queries/user';
import { useToastNotification } from 'hooks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as joi from 'joi';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Button,
  Flex
} from '@chakra-ui/react';
import { Segment, StyledLink } from 'UI';
import styled from 'styled-components';

const ForgotPasswordSection = styled.div`
  margin-top: 10px;
`;

interface IFormInputs {
  username: string;
  password: string;
}

const schema = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
});

const Login = () => {
  const { pushNotification } = useToastNotification();
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

  const isValid = (field: 'username' | 'password') => {
    return ((errors && errors[field]?.message) ?? '').length > 0;
  };

  return (
    <Stack direction='column' spacing={2} align='center'>
      <Segment align='center' w={{ sm: 300, md: 500 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl w={{ sm: 200, md: 400 }} isInvalid={isValid('username')}>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              name='username'
              mb={5}
              ref={register({ required: true })}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>
          <FormControl w={{ sm: 200, md: 400 }} isInvalid={isValid('password')}>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              name='password'
              ref={register({ required: true })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <ForgotPasswordSection>
            <StyledLink to='/reset'>Forgot your password?</StyledLink>
          </ForgotPasswordSection>

          <Flex justify='center' mt={5}>
            <Button
              isLoading={loading}
              type='submit'
              w={{ sm: 200, md: 400 }}
              isFullWidth
            >
              Login
            </Button>
          </Flex>
        </form>
      </Segment>
    </Stack>
  );
};

export default Login;
