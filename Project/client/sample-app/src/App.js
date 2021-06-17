// localhost:4000/product/get
// localhost:4000/product/create
// localhost:4000/login
// localhost:4000/register
// const response = await fetch('http://localhost:4000/users');

import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Layout from './layout/Layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Layout>
      <Switch>
          <Route path="/" exact >
            <Redirect to='/login' />
          </Route>

          <Route path="/welcome">
            <Welcome />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>
      </Switch>
    </Layout>
  );
}

export default App;
