import React, { useState } from 'react';
import { Box, List, ListItem, Divider } from '@chakra-ui/react';
import { Search } from 'react-feather';
import styled from 'styled-components';

interface ISearchResultProps {
  display: string;
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  width: 100%;
  border-radius: 60px;
  box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.12);

  svg {
    margin-right: 20px;
  }
`;

const SearchInput = styled.input`
  height: 40px;
  width: 100%;
  outline: none;
  border-radius: inherit;
  padding: 0 60px 0 20px;
  font-size: 18px;
`;

const SearchResults = styled(Box)<ISearchResultProps>`
  display: ${(props: ISearchResultProps) => props.display}
  margin-top: 5px;
  padding: 10px;
  box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.12);
  z-index: 100;
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <Box w={{ sm: 250, md: 600 }} m='auto' pb={10}>
      <SearchContainer>
        <SearchInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value) {
              setIsSearching(true);
            } else {
              setIsSearching(false);
            }
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
        />
        <Search />
      </SearchContainer>

      <SearchResults display={isSearching ? 'block' : 'none'}>
        <List spacing={5}>
          <ListItem>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
            <Divider />
          </ListItem>
        </List>
      </SearchResults>
    </Box>
  );
};

export default SearchBar;
