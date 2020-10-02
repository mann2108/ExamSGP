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

        if (/^[\w]*$/.test(this.state.textarea)) {
            const details = {
                textarea: this.state.textarea,
            }
            Axios.post("http://localhost:5000/confirmation", {details})
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
                        Application Accepted{console.log(this.props)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.sendValues}>
                        <FormGroup>
                            <Label>Any Suggestions</Label>
                            <Input type="textarea" name="textarea" onChange={this.handleInputChange} />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide} >Close</Button>
                    <Button type="submit" color="primary">Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}