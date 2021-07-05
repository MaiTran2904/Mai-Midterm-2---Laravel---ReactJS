import React from 'react';
import ReactDOM from 'react-dom';
import  "bootstrap/dist/css/bootstrap.css";
import HomePage from './users/homepage.component';
import Login from './users/login.component';
import Register from './users/register.component';
import Forgot from './users/forgot.component';
import {
    BrowserRouter as Router,  Route,
    Switch,
  } from "react-router-dom";

function App() {
    return (
      <Router>
      <div className="container">
          <Switch>
              <Route exact path="/">
                  <HomePage />
              </Route>
              <Route path="/login">
                  <Login />
              </Route>
              <Route path="/register">
                  <Register />
              </Route>
              <Route path="/forgot">
                  <Forgot />
              </Route>
          </Switch>
      </div>
  </Router>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
