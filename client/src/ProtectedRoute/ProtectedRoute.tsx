import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { WHO_AM_I } from 'graphql/queries/user';
import { useApolloClient } from '@apollo/client';

export interface Props {
  component: React.FC<RouteComponentProps>;
  path: Array<string> | string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  path,
  exact = false
}: Props) => {
  const client = useApolloClient();
  const user = client.readQuery({
    query: WHO_AM_I
  });

  return (
    <Route
      path={path}
      exact={exact}
      render={(props: RouteComponentProps) =>
        user ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default ProtectedRoute;
