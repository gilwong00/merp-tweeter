import React, { useState, useContext } from 'react';
import { AppContext } from 'Context';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
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
  comments: Array<IComment>;
}

const CommentButton: React.FC<IProps> = ({ comments }) => {
  const { pushNotification } = useContext(AppContext);
  const [showCommentDialog, setShowCommentDialog] = useState<boolean>(false);

  const { register, handleSubmit, errors, reset } = useForm<ICommentInputs>({
    resolver: joiResolver(schema)
  });

  const handleAddComment = async (data: ICommentInputs) => {
    reset();
  };

  const hasFormErrors =
    ((errors && errors['comment']?.message) ?? '').length > 0;

  return (
    <Box>
      <IconButton
        w={100}
        // isLoading={likeTweetLoading || unlikeTweetLoading}
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
