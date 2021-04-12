import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import Login from './pages/login/login';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
      </Switch>
    </BrowserRouter>
  );
}