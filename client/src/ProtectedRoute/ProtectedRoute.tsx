import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { client } from 'utils';
import { WHO_AM_I } from 'graphql/queries/user';

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
