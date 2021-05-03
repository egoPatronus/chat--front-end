/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import isJWT from 'validator/es/lib/isJWT';

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children, ...rest }) {
  function authRequest() {
    const token = sessionStorage.getItem('auth_token') ?? '';
    if (token) {
      const isValidToken = isJWT(token);
      return isValidToken;
    }
    return false;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => (authRequest()
        ? (children)
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        ))}
    />
  );
}
