import React, { useState, useContext } from 'react';
import { AppContext } from 'Context';
import { useToastNotification } from 'hooks';
import { useHistory } from 'react-router-dom';
import { COMMENT_TWEET } from 'graphql/mutations/comment';
import { COMMENT_FRAGMENT } from 'graphql/fragments/comment';
import { useMutation } from '@apollo/client';
import { ApolloCache } from '@apollo/client/core';
import { IComment } from 'Tweet';
import {
  IconButton,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormErrorMessage,
  Input,
  Button
} from '@chakra-ui/react';
import { MessageCircle } from 'react-feather';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as joi from 'joi';

interface ICommentInputs {
  comment: string;
}

const schema = joi.object({
  comment: joi.string().required()
});

interface IProps {
  tweetId: String;
  comments: Array<IComment>;
}

const CommentButton: React.FC<IProps> = ({ tweetId, comments }) => {
  const { user } = useContext(AppContext);
  const history = useHistory();
  const { pushNotification } = useToastNotification();
  const [showCommentDialog, setShowCommentDialog] = useState<boolean>(false);
  const [
    comment,
    { loading: commentLoading, error: commentError }
  ] = useMutation(COMMENT_TWEET, {
    update(cache: ApolloCache<any>, { data }): void {
      if (commentError) return pushNotification('error', commentError.message);

      const tweet = cache.readFragment<{
        _id: string;
        comments: Array<string>;
      }>({
        id: `Tweet:${tweetId}`,
        fragment: COMMENT_FRAGMENT
      });

      const comments = [...(tweet?.comments ?? []), data.comment._id];

      cache.writeFragment({
        id: `Tweet:${tweetId}`,
        fragment: COMMENT_FRAGMENT,
        data: {
          __typename: 'Tweet',
          comments
        }
      });

      pushNotification('success', 'Comment added');
    }
  });

  const { register, handleSubmit, errors, reset } = useForm<ICommentInputs>({
    resolver: joiResolver(schema)
  });

  const handleAddComment = async (data: ICommentInputs) => {
    if (!user) return history.push('/login');

    await comment({
      variables: { comment: data.comment, tweetId, username: user.username }
    });
    reset();
    setShowCommentDialog(false);
  };

  const hasFormErrors =
    ((errors && errors['comment']?.message) ?? '').length > 0;

  return (
    <Box>
      <IconButton
        w={100}
        isLoading={commentLoading}
        variant='outline'
        colorScheme='blue'
        aria-label='Like Tweet'
        onClick={() => setShowCommentDialog(current => !current)}
        icon={
          <Flex align='center'>
            <MessageCircle fill={comments.length > 0 ? 'blue' : 'none'} />
            {comments.length > 0 && <Box pl={2}>{comments.length}</Box>}
          </Flex>
        }
      />
      <Modal
        isOpen={showCommentDialog}
        onClose={() => setShowCommentDialog(false)}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(handleAddComment)}>
          <ModalContent>
            <ModalHeader>Add your comment</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={hasFormErrors}>
                <Input
                  type='text'
                  placeholder='Your comment'
                  name='comment'
                  ref={register({ required: true })}
                />
                <FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type='submit' colorScheme='teal' mr={3}>
                Comment
              </Button>
              <Button colorScheme='red'>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};

export default CommentButton;
