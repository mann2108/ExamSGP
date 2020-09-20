import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import signup from './signup';
import logout from './logout';


class Start extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path={"/"}  component={App} />
        <Route exact path={"/logout"} component={logout} />
        <Route exact path={"/signup"} component={signup} />
        
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
