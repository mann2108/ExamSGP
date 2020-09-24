import Axios from 'axios';
import React from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import dashboard from './dashboard';

export default class signup extends React.Component {

    constructor() {
        super()
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            id: '',
            photo: '',
            university: '',
            designation: '',
        }
    }

    sendValues = (event) => {

        event.preventDefault();

        if ((this.state.firstname === '') || (this.state.lastname === '') || (this.state.email === '') || (this.state.id === '') || (this.state.photo === '') || (this.state.university === '') || (this.state.designation === '')) {
            alert("Enter All Details.. ");
        }
        else {
            if (/^([\w\d](\.)*)+\@([\w\.]{1,2})+(\w)$/.test(this.state.email) && (this.state.firstname.length >= 3) && (this.state.lastname.length >= 3) && (this.state.university.length >= 3) && (this.state.designation.length >= 2)) {
                const details = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    id: this.state.id,
                    photo: this.state.photo,
                    university: this.state.university,
                    designation: this.state.designation
                }
                // console.log(details)

                Axios.post("http://localhost:5000/signup", { details })
                    .then(res => {
                        alert(res.data.statusMessage);
                        this.setState({
                            firstname: '',
                            lastname: '',
                            email: '',
                            id: '',
                            photo: '',
                            university: '',
                            designation: '',
                        });
                        Array.from(document.querySelectorAll("input")).forEach(
                            input => (input.value = '')
                        );
                        

                    })
                    .catch((err) => {
                        alert(err.response.data.error);
                        // console.log(err.data.statusMessage, "Inside Catch");
                    });
            }
            else {
                alert("Enter Proper Details");
            }

        }


    }

    handleInputChange = e => {
        let inputValue = e.target.value.trim();
        // console.log(inputValue)
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    fileUpload = e => {
        let files = e.target.files
        // console.log(files);

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (file) => {
            this.setState({
                id: file.target.result
            });
        }
    }

    photoUpload = e => {
        let files = e.target.files;

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (file) => {
            this.setState({
                photo: file.target.result
            });
        }
    }

    render() {
        return (
            <div style={{ flex: 1, marginLeft: '1vh' }}>
                <Form onSubmit={this.sendValues}>
                    <Row form>
                        <Col md={2} xs={2}>
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input type="text" name="firstname" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                        <Col md={2} xs={2}>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input type="text" name="lastname" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="email" name="email" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <Label>University Name</Label>
                                <Input type="text" name="university" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label>Employee Designation</Label>
                                <Input type="text" name="designation" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <Label>Upload ID Proof</Label>
                                <Input type="file" name="id" onChange={this.fileUpload} />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label>Upload Photo</Label>
                                <Input type="file" name="photo" onChange={this.photoUpload} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button type="submit" color="primary">Submit</Button>
                </Form>
            </div>
        )
    }
}