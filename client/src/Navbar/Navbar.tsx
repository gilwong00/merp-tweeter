import React, { useContext } from 'react';
import { NavMenu } from '.';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LOGOUT } from 'graphql/mutations/user';
import { useMutation, useApolloClient } from '@apollo/client';
import { useCookie, useToastNotification } from 'hooks';
import { AppContext } from 'Context';
import { Flex, Heading } from '@chakra-ui/react';

const Navbar = () => {
  const { user } = useContext(AppContext);
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
      <Flex align='center' justify='space-between'>
        <Link to='/'>
          <Heading>Merp Tweeter</Heading>
        </Link>
      </Flex>
      <NavMenu user={user} logout={logout} />
    </Flex>
  );
};

export default Navbar;
