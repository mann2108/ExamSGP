import React, { Component,Fragment } from 'react';
import { Jumbotron, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const shell = require('electron').shell;
import history from './history';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      password : ""
    }
    this.handleUrlRedirect = this.handleUrlRedirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUrlRedirect = (url) => () => {
    shell.openExternal(url);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("hello2");
    history.push("/admindashboard");
  }

  render() {
    return(
      <Fragment>
        <Jumbotron>
          <h1 className="display-6">Welcome to Examination Room!</h1>
          <p className="lead">This is your virtual examination room.</p>
          <hr className="my-2" />
          <p>Login to continue ...</p>
          <p className="lead">
            <Button color="primary" onClick={this.handleUrlRedirect('https://github.com/mann2108')}>Learn More</Button>
          </p>
        </Jumbotron>

        <Form style={{marginLeft:200,marginRight:200}} onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="eamil" placeholder="email" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="password" />
          </FormGroup>
          <Button color="primary">Submit</Button>
        </Form>
      </Fragment>
    );
  }
}

export default Home;
