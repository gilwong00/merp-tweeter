import React from 'react';
import { CircularProgress } from '@chakra-ui/react';
import styled from 'styled-components';

const Spinner = styled(CircularProgress)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Loading = () => (
  <Spinner
    value={30}
    size='200px'
    color='teal.300'
    isIndeterminate
    thickness='4px'
  />
);

export default Loading;
