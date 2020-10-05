import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import signup from './signup';
import logout from './logout';
import admin from './admin';
import error from './error';
import dashboard from './dashboard';

class Start extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={App} />
          <Route exact path={"/admin"} component={admin} />
          <Route exact path={"/signup"} component={signup} />
          <Route exact path={"/dashboard"} component={dashboard} />
          <Route exact path={"/*"} component={error} />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <Start />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
