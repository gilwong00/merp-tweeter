import React, { createContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LOGGED_IN_USER, WHO_AM_I } from 'graphql/queries/user';
import { cache } from 'Apollo';
export interface IUser {
  _id: string;
  username: string;
  email: string;
  token?: string;
}
interface IAppContext {
  user: IUser | null;
  loading: boolean;
}

export const AppContext = createContext<IAppContext>({
  user: null,
  loading: false
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
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

  const context: IAppContext = {
    user: data?.getLoggedInUser,
    loading
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppProvider;
