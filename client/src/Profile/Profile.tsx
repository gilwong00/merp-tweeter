import React from 'react';
import { useApolloClient } from '@apollo/client';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Avatar
} from '@chakra-ui/react';
import { Row, Segment } from 'UI';
import { GET_LOGGED_IN_USER } from 'graphql/queries/user';
import { IUser } from 'Context';

const Profile: React.FC = () => {
  const client = useApolloClient();
  const user: { getLoggedInUser: IUser } | null = client.cache.readQuery<{
    getLoggedInUser: IUser;
  }>({
    query: GET_LOGGED_IN_USER
  });

  console.log('sdf', user);
  return (
    <Segment>
      <Row justify='space-between'>
        <Avatar src='https://bit.ly/broken-link' />

        <StatGroup w='90%'>
          <Stat>
            <StatLabel>Followers</StatLabel>
            <StatNumber>{user?.getLoggedInUser?.followers}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Following</StatLabel>
            <StatNumber>{user?.getLoggedInUser?.following}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Total Likes</StatLabel>
            <StatNumber>{user?.getLoggedInUser?.totalTweets}</StatNumber>
          </Stat>
        </StatGroup>
      </Row>
    </Segment>
  );
};

export default Profile;
