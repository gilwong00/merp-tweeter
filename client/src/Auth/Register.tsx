import React from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from 'graphql/mutations/user';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as joi from 'joi';
import styled from 'styled-components';

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

// const FormContainer = styled(Segment)`
//   width: 550px;
//   margin-top: 2rem !important;
//   margin-left: auto !important;
//   margin-right: auto !important;
// `;

const Register = () => {
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    update(cache, { data: { registerUser } }) {
      console.log('register', registerUser);
    }
  });

  const {
    register,
    handleSubmit,
    errors,
    formState,
    reset
  } = useForm<IFormInputs>({
    resolver: joiResolver(schema)
  });

  const { isDirty, isSubmitting } = formState;

  const onSubmit = async (data: IFormInputs) => {
    const { username, email, password, confirmedPassword } = data;

    if (password === confirmedPassword) {
      // call mutation
      await registerUser({ variables: { username, email, password } });
      reset();
    }
  };

  // TODO add error validations
  return (
    // <FormContainer>
    //   <Form noValidate onSubmit={handleSubmit(onSubmit)}>
    //     <Header as='h1' textAlign='center'>
    //       Register
    //     </Header>
    //     <Form.Field>
    //       <label>Username</label>
    //       <input
    //         placeholder='Enter a username'
    //         type='text'
    //         name='username'
    //         ref={register({
    //           required: true
    //         })}
    //       />
    //     </Form.Field>

    //     <Form.Field>
    //       <label>Email</label>
    //       <input
    //         placeholder='Enter a email'
    //         type='text'
    //         name='email'
    //         ref={register({
    //           required: true
    //         })}
    //       />
    //     </Form.Field>

    //     <Form.Field>
    //       <label>Password</label>
    //       <input
    //         placeholder='Enter a password'
    //         type='password'
    //         name='password'
    //         ref={register({
    //           required: true
    //         })}
    //       />
    //     </Form.Field>

    //     <Form.Field>
    //       <label>Confirm Password</label>
    //       <input
    //         placeholder='Re-enter your password'
    //         type='password'
    //         name='confirmedPassword'
    //         ref={register({
    //           required: true
    //         })}
    //       />
    //     </Form.Field>
    //     <Button
    //       fluid
    //       type='submit'
    //       loading={isSubmitting || loading}
    //       color='green'
    //     >
    //       Register
    //     </Button>
    //   </Form>
    // </FormContainer>
    <div>dsdf</div>
  );
};

export default Register;
