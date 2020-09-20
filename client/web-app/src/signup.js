import Axios from 'axios';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

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
                
            })
            .catch((err) => alert(err.data.errMsg));
    }

    handleInputChange = e => {
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
            <div style={{ flex: 1 }}>
                <Form onSubmit={this.sendValues} >
                    <Form.Row>
                        <Col>
                            <Form.Label>First Name&nbsp;</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                                name="firstname"
                                value={this.state.firstname}
                                onChange={this.handleInputChange}
                            />

                        </Col>
                        <Col>
                            <Form.Label>Last Name&nbsp;</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.handleInputChange}
                            />

                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                        <Form.Label>Choose Proper ID Card For Verification</Form.Label>
                            <Form.Control 
                            type="file"
                            onChange={this.fileUpload}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label>Upload Photo</Form.Label>
                        <Form.Control
                        type="file"
                        onChange={this.photoUpload}
                        />
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Label>University</Form.Label>
                            <Form.Control
                            type="text"
                            name="university"
                            value={this.state.university}
                            onChange={this.handleInputChange}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                        <Form.Label>Desgination</Form.Label>
                        <Form.Control
                        type="text"
                        name="designation"
                        value={this.state.designation}
                        onChange={this.handleInputChange}
                        />
                        </Col>
                    </Form.Row>
                    <Button type="submit" variant="primary" >Submit </Button>
                </Form>
            </div>
        )
    }
}