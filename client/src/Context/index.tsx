import React, { createContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LOGGED_IN_USER, WHO_AM_I } from 'graphql/queries/user';
import { cache } from 'Apollo';
import { v4 } from 'uuid';

type NotificationType = 'success' | 'error';

export interface INotification {
  id: string;
  message: string;
  type: NotificationType;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  token?: string;
}

interface IAppContext {
  user: IUser | null;
  loading: boolean;
  notifications: Array<INotification>;
  pushNotification: (type: NotificationType, message: string) => void;
  removeNotification: (id: string) => void;
  resetNotifications: () => void;
}

export const AppContext = createContext<IAppContext>({
  user: null,
  loading: false,
  notifications: [],
  pushNotification: () => undefined,
  removeNotification: () => undefined,
  resetNotifications: () => undefined
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Array<INotification>>([]);
  const { data, loading } = useQuery(GET_LOGGED_IN_USER);

  // initialize user state
  if (data?.getLoggedInUser) {
    cache.writeQuery({
      query: WHO_AM_I,
      data: {
        __typename: 'Query',
        user: data?.getLoggedInUser
      }
    });
  }

  const pushNotification = (type: NotificationType, message: string) => {
    setNotifications([...notifications, { id: v4(), type, message }]);
  };

  const removeNotification = (id: string) => {
    const currentNotifications = notifications.slice();
    setNotifications(
      currentNotifications.filter(
        (notifications: INotification) => notifications.id !== id
      )
    );
  };

  const resetNotifications = () => setNotifications([]);

  const context: IAppContext = {
    user: data?.getLoggedInUser,
    loading,
    notifications,
    pushNotification,
    removeNotification,
    resetNotifications
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppProvider;
