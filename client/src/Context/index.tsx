import React, { createContext, useState } from 'react';
import { v4 } from 'uuid';

type NotificationType = 'success' | 'error';

export interface INotification {
  id: string;
  message: string;
  type: NotificationType;
}

interface IAppContext {
  notifications: Array<INotification>;
  pushNotification: (type: NotificationType, message: string) => void;
  removeNotification: (id: string) => void;
  resetNotifications: () => void;
}

export const AppContext = createContext<IAppContext>({
  notifications: [],
  pushNotification: () => undefined,
  removeNotification: () => undefined,
  resetNotifications: () => undefined
});

export default ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Array<INotification>>([]);

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
    notifications,
    pushNotification,
    removeNotification,
    resetNotifications
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
