import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LOGOUT } from 'graphql/mutations/user';
import { useMutation, useApolloClient } from '@apollo/client';
import { useCookie, useToastNotification } from 'hooks';
import { AppContext } from 'Context';
import {
  Flex,
  Button,
  Heading,
  Box,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuDivider
} from '@chakra-ui/react';
import './Navbar.css';

const Navbar = () => {
  const { user, loading } = useContext(AppContext);
  const history = useHistory();
  const { removeValue } = useCookie();
  const { pushNotification } = useToastNotification();
  const apolloClient = useApolloClient();

  const [logout] = useMutation(LOGOUT, {
    update() {
      apolloClient.cache.reset();
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
      {/* need to make this mobile friendly */}
      {/* <Box display={{ base: 'block', md: 'none' }}>
        <svg
          fill='white'
          width='12px'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Menu</title>
          <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
        </svg>
      </Box> */}

      <Flex ml='auto' align='center' justify='flex-end'>
        {user ? (
          <Menu isLazy>
            <MenuButton as={Button}>Hi @{user.username}</MenuButton>
            <MenuList>
              <MenuGroup title='Profile'>
                <MenuItem as={Link} to='/pofile'>
                  My Account
                </MenuItem>
                <MenuItem as={Link} to='/tweets'>
                  My Tweets
                </MenuItem>
                <MenuItem as={Link} to='/tweet/new'>
                  New Tweet
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Box d='flex'>
            <Button as={Link} to='/login' colorScheme='teal' size='md'>
              Login
            </Button>
            <Button className='nav-btn' as={Link} to='/register' size='md'>
              Register
            </Button>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
