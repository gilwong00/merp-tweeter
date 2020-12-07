import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type stringOrNumber = string | number;

type responsive = {
  sm: string;
  md: string;
};

interface ISegmentProps {
  children: React.ReactNode;
  minH?: number;
  h?: stringOrNumber;
  align?: string;
  w?: stringOrNumber | { sm: stringOrNumber; md: stringOrNumber };
  m?: stringOrNumber;
}

interface IRowProps {
  children: React.ReactNode;
  justify?: string;
  align?: string;
  p?: number;
}

interface IColumnProps {
  children: React.ReactNode;
  justify?: string;
  align?: responsive | string;
  pt?: stringOrNumber;
  mt?: stringOrNumber;
}

export const Segment: React.FC<ISegmentProps> = ({ children, ...rest }) => (
  <Box borderWidth='1px' borderRadius='sm' overflow='hidden' p={5} {...rest}>
    {children}
  </Box>
);

export const Row: React.FC<IRowProps> = ({ children, ...rest }) => (
  <Flex direction='row' {...rest}>
    {children}
  </Flex>
);

export const Column: React.FC<IColumnProps> = ({ children, ...rest }) => (
  <Flex direction='column' {...rest}>
    {children}
  </Flex>
);

export const StyledLink = styled(Link)`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;

export const ProfileLink = styled(Link)`
  &:hover {
    color: blue;
  }
`;
