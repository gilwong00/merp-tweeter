import React, { useState } from 'react';
import { Search, SearchProps, SearchResultProps } from 'semantic-ui-react';
import styled from 'styled-components';

const TweetSearch = styled(Search)`
  input {
    width: 400px;
  }
`;

const resultRenderer = (item: SearchResultProps) => (
  <div key={item.id}>{item.title}</div>
);

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  return (
    <TweetSearch
      minCharacters={2}
      onSearchChange={(e: React.SyntheticEvent, data: SearchProps) =>
        setSearchTerm(data.value ?? '')
      }
      resultRenderer={resultRenderer}
      value={searchTerm}
    />
  );
};

export default SearchBar;
