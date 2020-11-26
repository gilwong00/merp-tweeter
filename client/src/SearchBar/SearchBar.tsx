import React, { useState } from 'react';
import { Box, Flex, List, ListItem } from '@chakra-ui/react';
import { Search } from 'react-feather';
import styled from 'styled-components';

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

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  return (
    <Box w={600} m='auto' pb={10}>
      <SearchContainer>
        <SearchInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          value={searchTerm}
        />
        <Search />
      </SearchContainer>
      {/* render results */}
    </Box>
  );
};

export default SearchBar;
