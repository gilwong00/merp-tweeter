import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { IComment } from 'Tweet';
import { DateDisplay } from 'DateDisplay';
import { ProfileLink, Segment } from 'UI';

interface IProps {
  comment: IComment;
  width: number;
}

const Comment: React.FC<IProps> = ({ comment, width }) => (
  <Segment w={{ sm: 250, md: width ?? '' }}>
    <ProfileLink to={`/profile/${comment.username}`}>
      <Heading size='md'>@{comment.username}</Heading>
    </ProfileLink>
    <DateDisplay dateCreated={comment.dateCreated} />
    <Text>{comment.comment}</Text>
  </Segment>
);

export default Comment;
