import React from 'react';
import { Heading } from '@chakra-ui/react';
import { Column, StyledLink } from 'UI';

const NotFound = () => (
  <Column align='center' mt={20}>
    <Heading as='h1' size='xl' pb={5}>
      404 | Page Not Found
    </Heading>
    <StyledLink to='/'>Click here to return back to the home page</StyledLink>
  </Column>
);

export default NotFound;
