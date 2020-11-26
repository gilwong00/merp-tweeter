import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LOGOUT } from 'graphql/mutations/user';
import { useMutation, useApolloClient } from '@apollo/client';
import { useCookie } from 'hooks';
import { AppContext } from 'Context';
import { Flex, Button, Heading, Box } from '@chakra-ui/react';
import './Navbar.css';

const Navbar = () => {
  const { user, pushNotification } = useContext(AppContext);
  const history = useHistory();
  const { removeValue } = useCookie();
  const apolloClient = useApolloClient();

  const [logout] = useMutation(LOGOUT, {
    update() {
      apolloClient.resetStore();
      removeValue('token');
      pushNotification('success', `Logged out`);
      history.push('/login');
    }
  });

  return (
    <Flex zIndex={1} position='sticky' top={0} bg='purple.600' p={4}>
      <Flex flex={1} align='center' justify='space-between'>
        <Link to='/'>
          <Heading>Merp Tweeter</Heading>
        </Link>
      </Flex>
      <Flex flex={1} ml='auto' align='center' justify='flex-end'>
        {user ? (
          <Box d='flex'>
            <Button
              className='nav-btn'
              as={Link}
              to='/tweet/new'
              colorScheme='teal'
              size='md'
            >
              New Tweet
            </Button>
            <Button
              className='nav-btn'
              colorScheme='teal'
              size='md'
              onClick={() => logout()}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box d='flex'>
            <Button
              className='nav-btn'
              as={Link}
              to='/login'
              colorScheme='teal'
              size='md'
            >
              Login
            </Button>
            <Button
              className='nav-btn'
              as={Link}
              to='/register'
              colorScheme='teal'
              size='md'
            >
              Register
            </Button>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
