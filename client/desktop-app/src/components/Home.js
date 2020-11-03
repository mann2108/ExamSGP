import React, { Component, Fragment } from 'react';
import { Jumbotron, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Stream } from 'stream';
const shell = require('electron').shell;
const axios = require('axios');
import history from './history';
require('electron-cookies');
const path = require('path');
const fs = require('fs');

// import Cookies from 'js-cookie';
// const { session } = require('electron')
class Home extends Component {
    constructor(props) {
        super(props);
        // const storage_stream = fs.createWriteStream(path);
        this.handleUrlRedirect = this.handleUrlRedirect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // navigator.getUserMedia({video: true, audio: true}, (localMediaStream) => {
        //     let video = document.querySelector('video')
        //     video.src = window.URL.createObjectURL(localMediaStream)
        //     video.onloadedmetadata = (e) => {
        //         console.log(e.target.src)
        //     };
        // }, (err) => console.log(err));
        let constraintObj = {
            audio: true,
            video: true
        }
        navigator.mediaDevices.getUserMedia(constraintObj)
            .then(mediaStreamObj => {
                let video = document.querySelector('video');
                if ("srcObject" in video) {
                    video.srcObject = mediaStreamObj;
                }
                video.onloadedmetadata = (ev) => {
                    video.play();
                }
                let mediaRecorder = new MediaRecorder(mediaStreamObj);
                let chunks = []
                mediaRecorder.start();
                mediaRecorder.ondataavailable = (ev) => {
                    chunks.push(ev.data);
                }
                console.log(chunks);
                let vid1 = document.getElementById('jet1');
                let stop = document.getElementById('asd');
                stop.addEventListener('click', (ev) => {
                    mediaRecorder.stop();
                })
                mediaRecorder.onstop = (ev) => {
                    let blob = new Blob(chunks, { 'type': 'video/webm' });
                    let reader = new FileReader();
                    reader.onload = () => {
                        let buffer = Buffer.from (reader.result);
                        fs.writeFile("jeetexam.mp4", buffer, {}, (err, res) => {
                            if (err) {
                                console.log('error in saving')
                            }
                            else {
                                console.log('video saved')
                            }
                        })
                    }
                    reader.readAsArrayBuffer(blob);
                    // fs.writeFile("examinationsgpvideo", chunks.data, (err) => {
                    //     if (err) {
                    //         console.log("error in storing file locally")
                    //     }
                    //     else {
                    //         console.log("file saved successfully")
                    //     }
                    // })
                    chunks = [];
                    let videoUrl1 = window.URL.createObjectURL(blob);
                    vid1.src = videoUrl1;
                }

            })
    }

    handleUrlRedirect = (url) => () => {
        shell.openExternal(url);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let email1 = document.getElementById("email").value;
        let password1 = document.getElementById("password").value;

        if (email1 === "" || password1 === "") {
            alert("Email and Password are mandatory fields");
        } else {
            let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (emailPattern.test(email1)) {

                let admin_users = {
                    email: email1,
                    passwd: password1
                };

                axios.post("http://localhost:5000/signin", { admin_users })
                    .then((data) => {
                        if (data.data.role === "admin") {
                            document.cookie = 'email=' + data.data.email;
                            document.cookie = 'role=' + data.data.role;
                            document.cookie = 'orgId=' + data.data.orgId;
                            history.push('/admin');
                        } else if (data.data.role === "student") {
                            history.push("/student");
                        } else if (data.data.role === "faculty") {
                            history.push("/faculty");
                        } else {
                            alert("You are super admin use your web portal for login");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        alert("Sorry, email and password are incorrect!");
                    });

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
                        <Input type="email" name="email" id="email" placeholder="email" value="17it050@charusat.edu.in" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="password" value="1/KmyW*F7x" />
                    </FormGroup>
                    <Button color="primary">Submit</Button>
                    
                </Form>
                <video autoPlay></video>
                    <button id="asd">asd</button>
                    <video autoPlay id="jet1"></video>
            </Fragment>
        );
    }
}

export default Home;
