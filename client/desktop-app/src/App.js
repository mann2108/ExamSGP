import React,{ Component } from 'react'
import Main from './components/Main';
import {Router} from 'react-router-dom';
import history from './components/history';
function App(props){
    return(
      <Router history={history}>
      <Main />
      </Router>
    );
}
export default App;