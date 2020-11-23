import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { LOGOUT } from 'graphql/mutations/user';
import { useMutation, useApolloClient } from '@apollo/client';
import { useCookie } from 'hooks';
import { AppContext } from 'Context';

const Navbar = () => {
  const { user, pushNotification } = useContext(AppContext);
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname === '/' ? 'home' : location.pathname.substr(1);
  const [activeItem, setActiveItem] = useState<string>(path);
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
    <Menu pointing secondary size='massive' color='violet' inverted>
      {user ? (
        <>
          <Menu.Item
            name={user.username}
            as={Link}
            to='/'
            onClick={() => setActiveItem('/')}
          >
            Merp Tweeter
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item
              name='newTweet'
              active={activeItem === 'newTweet'}
              onClick={() => setActiveItem('newTweet')}
              as={Link}
              to='/tweet/new'
            />
            <Menu.Item name='logout' onClick={() => logout()} />
          </Menu.Menu>
        </>
      ) : (
        <>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={() => setActiveItem('home')}
            as={Link}
            to='/'
          />

          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={() => setActiveItem('login')}
              as={Link}
              to='/login'
            />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={() => setActiveItem('register')}
              as={Link}
              to='/register'
            />
          </Menu.Menu>
        </>
      )}
    </Menu>
  );
};

export default Navbar;
