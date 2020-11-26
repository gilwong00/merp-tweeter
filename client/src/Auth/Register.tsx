import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from 'graphql/mutations/user';
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
import { AppContext } from 'Context';

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
  const { pushNotification } = useContext(AppContext);
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
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              name='email'
              ref={register({ required: true })}
            />
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              name='password'
              ref={register({ required: true })}
            />
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type='password'
              name='confirmedPassword'
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

export default Register;
