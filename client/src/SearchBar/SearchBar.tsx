import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_TWEETS } from 'graphql/queries/tweet';
import { Box, List, ListItem, Spinner } from '@chakra-ui/react';
import { Search } from 'react-feather';
import { IUser } from 'Context';
import styled from 'styled-components';

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

const SearchResultContainer = styled(Box)<ISearchResultProps>`
  display: ${(props: ISearchResultProps) => props.display};
  margin-top: 10px;
  padding: 10px;
  box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.12);
  z-index: 100;
  border-radius: 5px;
`;

const SearchResult = styled(ListItem)`
  cursor: pointer;
  padding: 5px;
  border-bottom: 1px solid rgba(34, 36, 38, 0.1);
  font-size: 18px;

  &:hover {
    background: #e6e3e3;
  }

  &:last-child {
    border-bottom: none;
  }
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

      {!loading && (
        <SearchResultContainer display={isSearching ? 'block' : 'none'}>
          <List spacing={5}>
            {data?.search.length > 0 ? (
              data?.search.map((result: ISearchResult) => (
                <SearchResult key={result._id}>
                  {result.message} - @{result.user.username}
                </SearchResult>
              ))
            ) : (
              <ListItem>No Results</ListItem>
            )}
          </List>
        </SearchResultContainer>
      )}
    </Box>
  );
};

export default SearchBar;
