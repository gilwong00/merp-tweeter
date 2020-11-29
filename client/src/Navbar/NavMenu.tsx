import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuDivider,
  IconButton,
  Button,
  Flex
} from '@chakra-ui/react';
import { IUser } from 'Context';
import { ChevronDown, Menu as MobileMenu } from 'react-feather';

interface IProps {
  user: IUser | null;
  logout: () => void;
}

const NavMenu: React.FC<IProps> = ({ user, logout }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <Flex ml='auto' align='center' justify='flex-end'>
      <Box onClick={() => setOpenMenu(true)}>
        <Menu isLazy={true} onClose={() => setOpenMenu(false)}>
          {user ? (
            <MenuButton as={Button} rightIcon={<ChevronDown />}>
              Hi @{user.username}
            </MenuButton>
          ) : (
            <MenuButton as={Box}>
              <IconButton aria-label='mobile-menu' icon={<MobileMenu />} />
            </MenuButton>
          )}
          {/* conditionally rendering the items because if we dont, this is being mounted but hidden and it messes with our mobile styles */}
          {openMenu && (
            <>
              {user ? (
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
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              ) : (
                <MenuList>
                  <MenuGroup>
                    <MenuItem as={Link} to='/login'>
                      Login
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem as={Link} to='/Register'>
                      Register
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              )}
            </>
          )}
        </Menu>
      </Box>
    </Flex>
  );
};

export default NavMenu;
