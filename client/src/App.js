import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import './App.css';

import { Provider } from "react-redux";
import store from "./store";

import Navbar from './components/navbar.component'
import EmployeesList from './components/employees-list.component';
import Register from './components/register.component';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import PrivateRoute from "./components/private.component";
import Editor from './components/editor.component';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
 return (
  <Provider store={store}>
    <Router>
      <Navbar />
      <Container maxWidth="lg">
        <br/>
          <Route exact path="/" component={EmployeesList} />
          <Route exact path="/register" component={Register} />
          <Switch>
              <PrivateRoute exact path="/editor" component={Editor} />
          </Switch>
      </Container>
    </Router>
  </Provider>
 );
}
 
export default App;