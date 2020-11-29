import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface SegmentProps {
  children: React.ReactNode;
  minH?: number;
  h?: string | number;
  align?: string;
  w?: string | number;
  m?: string | number;
}

export const Segment: React.FC<SegmentProps> = ({ children, ...rest }) => (
  <Box borderWidth='1px' borderRadius='sm' overflow='hidden' p={5} {...rest}>
    {children}
  </Box>
);

export const Row = ({ children }: { children: React.ReactNode }) => (
  <Flex dir='row' justify='space-between'>
    {children}
  </Flex>
);

export const StyledLink = styled(Link)`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;
