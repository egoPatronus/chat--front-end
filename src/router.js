import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Create from './pages/create/create';

export default function Router() {
  return (
    <>
      <ToastContainer limit={4} />
      <BrowserRouter>
        <Switch>
          <Route exact path="/create" component={Create} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
