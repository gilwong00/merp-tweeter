import React, { useState } from 'react';
import { useToastNotification } from 'hooks';
import { useMutation, useLazyQuery } from '@apollo/client';
import { VALIDATE_EMAIL } from 'graphql/queries/user';
import { CHANGE_PASSWORD } from 'graphql/mutations/user';
import { Segment, StyledLink } from 'UI';
import { Input, Button, Heading, Box } from '@chakra-ui/react';

const ResetPassword = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const { pushNotification } = useToastNotification();
  const [
    validateEmail,
    {
      loading: validateEmailLoading,
      error: validateEmailError,
      data: validateEmailData
    }
  ] = useLazyQuery(VALIDATE_EMAIL, {
    variables: { email },
    onCompleted: (): void => {
      if (validateEmailError)
        return pushNotification('error', validateEmailError.message);

      if (validateEmailData?.validateEmail) setStep(2);
    }
  });

  const [
    changePassword,
    { loading: changePasswordLoading, error: changePasswordError }
  ] = useMutation(CHANGE_PASSWORD, {
    update(_, { data }): void {
      if (changePasswordError)
        return pushNotification('error', changePasswordError.message);

      if (data.changePassword._id) setStep(3);
    }
  });

  // could always break these up into seperate components
  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <Segment align='center' w={600} m='auto'>
            <Input
              placeholder='Enter your email'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              value={email}
            />
            <Button
              isLoading={validateEmailLoading}
              isFullWidth
              mt={5}
              isDisabled={!email}
              onClick={() => validateEmail()}
            >
              Next
            </Button>
          </Segment>
        );
      case 2:
        return (
          <Segment align='center' w={600} m='auto'>
            <Input
              placeholder='Enter your new password'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
              value={newPassword}
              type='password'
            />
            <Button
              isLoading={changePasswordLoading}
              isFullWidth
              mt={5}
              isDisabled={!newPassword}
              onClick={async () =>
                await changePassword({ variables: { email, newPassword } })
              }
            >
              Submit
            </Button>
          </Segment>
        );
      case 3:
        return (
          <Box align='center' w={600} m='auto'>
            <Heading as='h2'>Your password has been updated!</Heading>
            <StyledLink to='/login'>Click here to login</StyledLink>
          </Box>
        );
      default:
        break;
    }
  };

  return <>{renderStep(step)}</>;
};

export default ResetPassword;
