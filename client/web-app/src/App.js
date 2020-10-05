import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';
import { BrowserRouter, Link, NavLink } from 'react-router-dom';
import signup from './signup';
import logout from './logout'

export default class App extends React.Component {
  onNavigateSignup = () => {
    this.props.history.push('/signup');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Online Examination Portal</h1>
          <Button onClick={this.onNavigateSignup} variant="outlined" color="primary">
            Register Your Organization
          </Button>
        </header>
      </div>
    )
  }

}
