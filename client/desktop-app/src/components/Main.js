import React, { Fragment, Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';


import history from './history';
import Home from "./Home";
import AdminDashboard from './Admin/AdminDashboard';
import AddAdmins from './Admin/AddAdmins';
import AddFaculties from './Admin/AddFaculties';
import AddStudents from './Admin/AddStudents';
import DisplayUsers from './Admin/DisplayUsers';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      password : ""
    }
  }

  render() {
    return(
        <Router history={history}>
            <Fragment>
                <Switch>
                    <Route exact path="/home" component={() => <Home />}></Route>
                    <Route exact path="/admin" component={() => <AdminDashboard />}></Route>
                    <Route exact path="/admin/students" component={() => <AddStudents />}></Route>
                    <Route exact path="/admin/faculties" component={() => <AddFaculties />}></Route>
                    <Route exact path="/admin/admins" component={() => <AddAdmins />}></Route>
                    <Route exact path="/admin/display" component={() => <DisplayUsers />}></Route>
                    <Route exact path="/*" component={() => <Home />}></Route>
                    
                </Switch>
            </Fragment>
        </Router>
    );
  }
}

export default Main;
