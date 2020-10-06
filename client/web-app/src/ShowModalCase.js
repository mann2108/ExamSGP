import Axios from 'axios';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';

export default class ShowModalCase extends React.Component {
    constructor() {
        super();
        this.state = {
            textarea: ''
        }
    }

    handleInputChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value.trim(),
        });
    }

    sendValues = (event) => {
        event.preventDefault();
        const details = {
            textarea: this.state.textarea,
            email: this.props.email
        }
        // alert("inside if")
        if (this.props.header === "Application Rejected") {
            Axios.post("http://localhost:5000/rejection", { details })
                .then(res => {
                    alert(res.data.statusMessage);
                    this.setState({
                        textarea: ''
                    });
                })
                .catch((err) => {
                    alert(err.response.data.error);
                })
        }
        else {
            Axios.post("http://localhost:5000/confirmation", { details })
                .then(res => {
                    alert(res.data.statusMessage);
                    this.setState({
                        textarea: ''
                    });
                })
                .catch((err) => {
                    alert(err.response.data.error);
                });
        }


        // if (/^[\w]*$/.test(this.state.textarea)) {

        // }
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        {this.props.header}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <Label>Any Suggestions</Label>
                            <Input type="textarea" name="textarea" onChange={this.handleInputChange} />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide} >Close</Button>
                    <Button type="submit" color="primary"
                        onClick={this.sendValues}
                    >Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}