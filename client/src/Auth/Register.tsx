import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from 'graphql/mutations/user';
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
import { Segment } from 'UI';

interface IFormInputs {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

const schema = joi.object({
  username: joi.string().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: joi.string().required(),
  confirmedPassword: joi.string().required()
});

const Register = () => {
  const { pushNotification } = useToastNotification();
  const history = useHistory();
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: (): void => {
      if (error) {
        return pushNotification('error', `Could not register ${error.message}`);
      } else {
        pushNotification('success', 'Registed Successfully');
        return history.push('/login');
      }
    }
  });

  const { register, handleSubmit, errors, reset } = useForm<IFormInputs>({
    resolver: joiResolver(schema)
  });

  const onSubmit = async (data: IFormInputs) => {
    const { username, email, password, confirmedPassword } = data;

    if (password === confirmedPassword) {
      await registerUser({ variables: { username, email, password } });
      reset();
    }
  };

  const isValid = (
    field: 'username' | 'email' | 'password' | 'confirmedPassword'
  ) => {
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
              ref={register({ required: true })}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            w={{ sm: 200, md: 400 }}
            isInvalid={isValid('email')}
            mt={5}
          >
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              name='email'
              ref={register({ required: true })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            w={{ sm: 200, md: 400 }}
            isInvalid={isValid('password')}
            mt={5}
          >
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              name='password'
              ref={register({ required: true })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            w={{ sm: 200, md: 400 }}
            isInvalid={isValid('confirmedPassword')}
            mt={5}
          >
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type='password'
              name='confirmedPassword'
              ref={register({ required: true })}
            />
            <FormErrorMessage>
              {errors.confirmedPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <Flex justify='center' mt={5}>
            <Button
              isLoading={loading}
              type='submit'
              isFullWidth
              w={{ sm: 200, md: 400 }}
            >
              Register
            </Button>
          </Flex>
        </form>
      </Segment>
    </Stack>
  );
};

export default Register;
