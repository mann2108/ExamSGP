import React, { Component, Fragment } from 'react';
import { Jumbotron, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const shell = require('electron').shell;
const axios = require('axios');
import history from './history';
require('electron-cookies');
// import Cookies from 'js-cookie';
// const { session } = require('electron')
class Home extends Component {
    constructor(props) {
        super(props);
        this.handleUrlRedirect = this.handleUrlRedirect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUrlRedirect = (url) => () => {
        shell.openExternal(url);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let email1 = document.getElementById("email").value;
        let password1 = document.getElementById("password").value;
        
        if(email1==="" || password1==="") {
            alert("Email and Password are mandatory fields");
        } else {
            let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if(emailPattern.test(email1)) {
                
            let admin_users = {
                email: email1,
                passwd: password1
            };
            
            axios.post("http://localhost:5000/signin", {admin_users})
            .then((data) => {
                if(data.data.role==="admin") {
                    document.cookie = `key=${email1};`
                    console.log(document.cookie)
                    history.push('/admin');
                } else if(data.data.role==="student") {
                    history.push("/student");
                } else if(data.data.role==="faculty") {
                    history.push("/faculty");
                } else {
                    alert("You are super admin use your web portal for login");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Sorry, email and password are incorrect!");
            })
            
            // const cookie = { url: '/', name: 'dummy_name', value: 'dummy' }
            // session.defaultSession.cookies.set(cookie)
            // .then(() => {
            //     console.log("done");
            // }, (error) => {
            //     console.error(error)
            // })
            // storage.setItem(`myCat`, `Tom`);
            // let cat = storage.getItem(`myCat`);
            // console.log(cat);
            // axios.post("http://localhost:5000/getOrgId", {email : email1})
            // .then((data) => {
            //     console.log(data);
            //     if(data.data.role==="admin") {
            //         history.push({
            //             pathname: '/admin',
            //             state: { detail: "woww" }
            //         });
            //         // history.push("/admin");
            //     } else if(data.data.role==="student") {
            //         history.push("/student");
            //     } else if(data.data.role==="faculty") {
            //         history.push("/faculty");
            //     } else {
            //         alert("You are super admin use your web portal for login");
            //     }
            // })
            // .catch((err) => {
            //     alert("Sorry, email and password are incorrect!");
            // })


            } else {
                alert("Email is not in valid format!")
            }
        }
    }

    render() {
        return (
            <Fragment>
                <Jumbotron>
                    <h1 className="display-6">Welcome to Examination Room!</h1>
                    <p className="lead">This is your virtual examination room.</p>
                    <hr className="my-2" />
                    <p>Login to continue ...</p>
                    <p className="lead">
                        <Button color="primary" onClick={this.handleUrlRedirect('http://localhost:3000/')}>Learn More</Button>
                    </p>
                </Jumbotron>
                <Form style={{ marginLeft: 200, marginRight: 200 }} onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="password"/>
                    </FormGroup>
                    <Button color="primary">Submit</Button>
                </Form>
            </Fragment>
        );
    }
}

export default Home;
