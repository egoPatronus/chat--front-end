/* eslint-disable react/no-children-prop */
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import PrivateRoute from './components/private-route/private-route';
import Chat from './pages/chat/chat';
import Create from './pages/create/create';
import Login from './pages/login/login';

export default function Router() {
  return (
    <>
      <ToastContainer limit={4} />
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/">
            <Chat />
          </PrivateRoute>
          <Route path="/create" component={Create} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
