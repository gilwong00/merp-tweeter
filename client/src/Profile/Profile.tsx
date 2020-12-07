import React, { useEffect, useState } from 'react';
import { Loading } from 'Loading';
import { Column, Segment } from 'UI';
import { useParams } from 'react-router-dom';
import {
  ApolloCache,
  useApolloClient,
  useLazyQuery,
  useMutation
} from '@apollo/client';
import {
  Stat,
  StatLabel,
  StatNumber,
  Avatar,
  Heading,
  Button,
  Divider
} from '@chakra-ui/react';
import { FETCH_USER, GET_LOGGED_IN_USER } from 'graphql/queries/user';
import { FOLLOW_OR_UNFOLLOW } from 'graphql/mutations/user';
import { FOLLOWING_FRAGMENT } from 'graphql/fragments/user';
import { IUser } from 'Context';
import { UserPlus, UserCheck } from 'react-feather';
import { useToastNotification } from 'hooks';
import styled from 'styled-components';

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 350px) {
    flex-direction: column;
    padding-top: 10px;
  }
`;

const Profile: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const { username } = useParams<{ username: string | undefined }>();
  const { pushNotification } = useToastNotification();
  const client = useApolloClient();

  const loggedInUser: {
    getLoggedInUser: IUser;
  } | null = client.cache.readQuery<{
    getLoggedInUser: IUser;
  }>({
    query: GET_LOGGED_IN_USER
  });

  const [
    fetchUser,
    { loading: fetchUserLoading, error: fetchUserError, data: fetchUserData }
  ] = useLazyQuery(FETCH_USER, {
    variables: { username }
  });

  const userDetails: IUser = fetchUserData
    ? fetchUserData.fetchUser
    : loggedInUser?.getLoggedInUser;

  const [
    followOrUnfollow,
    { loading: followUnFollowLoading, error: followUnFollowError }
  ] = useMutation(FOLLOW_OR_UNFOLLOW, {
    update(cache: ApolloCache<any>): void {
      if (followUnFollowError)
        return pushNotification('error', followUnFollowError.message);

      const id = `User:${loggedInUser?.getLoggedInUser._id}`;

      const user = cache.readFragment<{ _id: string; following: number }>({
        id,
        fragment: FOLLOWING_FRAGMENT
      }) as { _id: string; following: number };

      if (user) {
        cache.writeFragment({
          id,
          fragment: FOLLOWING_FRAGMENT,
          data: {
            __typename: 'User',
            following: isFollowing ? user.following - 1 : user.following + 1
          }
        });
      }
    },
    refetchQueries: [
      {
        query: FETCH_USER,
        variables: { username }
      }
    ]
  });

  useEffect(() => {
    if (username && username !== loggedInUser?.getLoggedInUser.username) {
      fetchUser();
    }
  }, [username, fetchUser, loggedInUser]);

  useEffect(() => {
    if (userDetails && userDetails?.followers) {
      const following = userDetails?.followers.some(
        (follower: string) => follower === loggedInUser?.getLoggedInUser._id
      );
      setIsFollowing(following);
    }
  }, [userDetails, loggedInUser]);

  if (fetchUserError) pushNotification('error', fetchUserError.message);

  if (fetchUserLoading) return <Loading />;

  return (
    <Segment align='center' w={{ sm: 290, md: 600 }} m='auto'>
      <Section>
        <Column justify='flex-start' align='center'>
          <Avatar
            src='https://bit.ly/broken-link'
            size='xl'
            m={{ sm: 'auto', md: 0 }}
          />
          <Heading as='h1' size='lg' pt={2}>
            @{userDetails.username}
          </Heading>
        </Column>
        {username && username !== loggedInUser?.getLoggedInUser.username && (
          <Button
            w={100}
            mt={{ sm: 5, md: 'none' }}
            isLoading={followUnFollowLoading}
            onClick={async () =>
              await followOrUnfollow({
                variables: {
                  userId: userDetails._id,
                  actionType: !isFollowing ? 'follow' : 'unfollow'
                }
              })
            }
          >
            {isFollowing ? <UserCheck /> : <UserPlus />}
          </Button>
        )}
      </Section>
      <Divider h={5} size='md' mb={{ sm: 'auto', md: 5 }} />
      <Section>
        <Stat>
          <StatLabel>Followers</StatLabel>
          <StatNumber>{userDetails?.followers?.length}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Following</StatLabel>
          <StatNumber>{userDetails.following}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Tweets</StatLabel>
          <StatNumber>{userDetails.totalTweets}</StatNumber>
        </Stat>
      </Section>
    </Segment>
  );
};

export default Profile;
