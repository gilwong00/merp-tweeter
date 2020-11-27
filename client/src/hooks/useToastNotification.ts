import { useToast } from '@chakra-ui/react';

type NotificationType = 'success' | 'error';

const useToastNotification = () => {
  const toast = useToast();

  const pushNotification = (type: NotificationType, message: string) => {
    toast({
      title: type.toUpperCase(),
      description: message,
      status: type,
      duration: 3000,
      isClosable: true,
      position: 'top-right'
    });
  };

  return { pushNotification };
};

export default useToastNotification;
