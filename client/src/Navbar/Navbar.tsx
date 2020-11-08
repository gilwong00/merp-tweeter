import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { WHO_AM_I } from 'graphql/queries/user';
import { LOGOUT } from 'graphql/mutations/user';
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { useCookie } from 'hooks';

const Navbar = () => {
  const location = useLocation();
  const client = useApolloClient();
  const path = location.pathname === '/' ? 'home' : location.pathname.substr(1);
  const [activeItem, setActiveItem] = useState<string>(path);
  const [logout] = useLazyQuery(LOGOUT);
  const { removeValue } = useCookie();

  const user = client.readQuery({
    query: WHO_AM_I
  });

  const handleItemClick = (item: string) => setActiveItem(item);

  return (
    <Menu pointing secondary size='massive' color='teal' inverted={true}>
      {user ? (
        <>
          <Menu.Item name={user.username} active as={Link} to='/'>
            Merp Tweeter
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              onClick={() => {
                removeValue('token');
                logout();
              }}
            />
          </Menu.Menu>
        </>
      ) : (
        <>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={() => handleItemClick('home')}
            as={Link}
            to='/'
          />

          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={() => handleItemClick('login')}
              as={Link}
              to='/login'
            />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={() => handleItemClick('register')}
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
