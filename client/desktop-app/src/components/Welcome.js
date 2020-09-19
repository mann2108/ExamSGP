import React, { Fragment, Component } from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { Spinner, Breadcrumb, BreadcrumbItem, Col, Label, Form, FormGroup, Input, FormText, Button, Jumbotron, Container } from 'reactstrap';
import history from './history';
class Welcome extends Component {
  constructor(props){
    super(props);
    this.state = {
      email : "",
      password : ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    history.push("/admin");
  }

  render(){
    return(
      <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Online Examination Room</h1>
          <p className="lead">Login to continue ...</p>
        </Container>
      </Jumbotron>
      <div style={{marginLeft:200, marginRight:150}}>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="email" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password" />
          </FormGroup>
          <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </div>
    </div>
    );
  }
}

export default Welcome;