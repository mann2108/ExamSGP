import React, { Fragment, Component } from 'react';
import Welcome from './Welcome';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainStudent from './Student/MainStudent';
import MainAdmin from './Admin/MainAdmin';
import MainFaculty from './Faculty/MainFaculty';

class Main extends Component {
  render(){
    return(
      <Fragment>
        <Switch>
          <Route exact path='/' component={() => <Welcome />}></Route>
          <Route exact path='/admin' component={() => <MainAdmin />}></Route>
          <Route exact path='/faculty' component={() => <MainFaculty />}></Route>
          <Route exact path='/student' component={() => <MainStudent />}></Route>
        </Switch>
      </Fragment>
    );
  }
}
export default Main;