import React, { Fragment, Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';

import history from './history';
import Home from "./Home";
import AdminDashboard from './Admin/AdminDashboard';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      password : ""
    }
  }

  render() {
    console.log("hello1");
    return(
        <Router history={history}>
            <Fragment>
                <Switch>
                    <Route exact path="/admindashboard" component={() => <AdminDashboard />}></Route>
                    <Route exact path="/*" component={() => <Home />}></Route>
                    
                </Switch>
            </Fragment>
        </Router>
    );
  }
}

export default Main;
