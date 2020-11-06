import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_USER } from 'graphql/mutations/user';
import { WHO_AM_I } from 'graphql/queries/user';
import { useCookie } from 'hooks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button, Form, Segment, Header } from 'semantic-ui-react';
import * as joi from 'joi';
import styled from 'styled-components';

interface IFormInputs {
  username: string;
  password: string;
}

const schema = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
});

const FormContainer = styled(Segment)`
  width: 550px;
  margin-top: 2rem !important;
  margin-left: auto !important;
  margin-right: auto !important;
`;

const Login = () => {
  const history = useHistory();
  const { setValue } = useCookie();
  const [authUser, { loading, error }] = useMutation(AUTH_USER, {
    update(cache, { data }) {
      // check for errors
      cache.writeQuery({
        query: WHO_AM_I,
        data: {
          __typename: 'Query',
          user: data?.authUser
        }
      });
      setValue('user', data?.authUser, { maxAge: 4 * 60 * 60 * 1000 });
      cache.evict({ fieldName: 'tweets: {}' });
      history.push('/');
    }
  });

  const { register, handleSubmit, errors, formState, reset } = useForm<
    IFormInputs
  >({
    resolver: joiResolver(schema)
  });

  const { isDirty, isSubmitting } = formState;

  const onSubmit = async (data: IFormInputs) => {
    const { username, password } = data;

    if (username && password) {
      // call mutation
      await authUser({ variables: { username, password } });
      reset();
    }
  };
  return (
    <FormContainer>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Header as='h1' textAlign='center'>
          Login
        </Header>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder='Enter a username'
            type='text'
            name='username'
            ref={register({
              required: true
            })}
          />
        </Form.Field>

        <Form.Field>
          <label>Password</label>
          <input
            placeholder='Enter a password'
            type='password'
            name='password'
            ref={register({
              required: true
            })}
          />
        </Form.Field>

        <Button
          fluid
          type='submit'
          loading={isSubmitting || loading}
          color='green'
        >
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Login;
