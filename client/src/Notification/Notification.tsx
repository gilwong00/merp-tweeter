import React, { useEffect, useContext } from 'react';
import { AppContext } from 'Context';
import { Message, Transition, List } from 'semantic-ui-react';
import styled from 'styled-components';

const Toaster = styled.div`
  position: fixed;
  width: 10%;
  max-width: 90%;
  top: 5em;
  right: 1em;
  text-align: center;
`;

const Notification: React.FC = () => {
  const { notifications, resetNotifications, removeNotification } = useContext(
    AppContext
  );

  useEffect(() => {
    if (notifications.length > 0) setTimeout(() => resetNotifications(), 5000);

    return () => clearTimeout();
  }, [notifications, resetNotifications]);

  return (
    <>
      <Toaster>
        <Transition.Group as={List} animation='fly left' duration={800}>
          {notifications.map(notification => (
            <Message
              key={notification.message}
              error={notification.type === 'error'}
              success={notification.type === 'success'}
              onDismiss={() => removeNotification(notification.id)}
            >
              <Message.Content>
                <Message.Header>
                  {notification.type.charAt(0).toUpperCase() +
                    notification.type.slice(1)}
                </Message.Header>
                <>
                  <p>{notification.message}</p>
                </>
              </Message.Content>
            </Message>
          ))}
        </Transition.Group>
      </Toaster>
    </>
  );
};

export default Notification;
