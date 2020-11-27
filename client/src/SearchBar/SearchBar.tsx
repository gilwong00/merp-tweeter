import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_TWEETS } from 'graphql/queries/tweet';
import { Box, List, ListItem, Divider, Spinner } from '@chakra-ui/react';
import { Search } from 'react-feather';
import styled from 'styled-components';
import { IUser } from 'Context';

interface ISearchResultProps {
  display: string;
}

interface ISearchResult {
  _id: string;
  message: string;
  user: Partial<IUser>;
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  width: 100%;
  border-radius: 60px;
  box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.12);

  .chakra-spinner,
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
  display: ${(props: ISearchResultProps) => props.display};
  margin-top: 10px;
  padding: 10px;
  box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.12);
  z-index: 100;
  border-radius: 5px;
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [search, { loading, data }] = useLazyQuery(SEARCH_TWEETS, {
    variables: { searchTerm }
  });

  useEffect(() => {
    if (searchTerm.length > 0) search();
  }, [searchTerm, search]);

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
        {loading ? <Spinner /> : <Search />}
      </SearchContainer>

      <SearchResults display={isSearching ? 'block' : 'none'}>
        <List spacing={5}>
          {/* todo make cursor pointer, add bg color when hovering, make font size bigger */}
          {data?.search.map((result: ISearchResult) => (
            <ListItem key={result._id}>
              {result.message} - @{result.user.username}
              <Divider pt={1} />
            </ListItem>
          ))}
        </List>
      </SearchResults>
    </Box>
  );
};

export default SearchBar;
