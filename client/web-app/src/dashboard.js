import Axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, NavLink, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Modal } from 'react-bootstrap';
import ShowModalCase from './ShowModalCase';




export default class dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            userDetails: [{
                firstname: '',
                lastname: '',
                designation: '',
                email: '',
                photo: '',
                university: '',
                id: '',
                idName: '',
                photoName: '',
                addModalShow: false,
            }],
            sendDetails: '',
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:5000/dashboard')
            .then((res) => {
                let values = res.data;
                let details = [];
                // console.log(values);
                for (let i = 0; i < values.length; i++) {
                    this.setState((prevState) => {
                        return {
                            userDetails: [...prevState.userDetails, {
                                firstname: values[i].firstname,
                                lastname: values[i].lastname,
                                email: values[i].email,
                                designation: values[i].designation,
                                photo: values[i].photo,
                                id: values[i].id,
                                university: values[i].university,
                                idName: values[i].idName,
                                photoName: values[i].photoName,
                            }]
                        }
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    renderDetails = (value, index) => {
        return (
            <tr key={index}>
                <td>{value.firstname} </td>
                <td>{value.lastname} </td>
                <td>{value.email} </td>
                <td>{value.designation} </td>
                <td>
                    <a href="#" onClick={() => this.openUrl(value.id)}>{value.idName}</a>
                </td>
                <td>
                    <a href="#" onClick={() => this.openUrl(value.photo)}>{value.photoName}</a>
                </td>
                <td>{value.university}</td>
                <td>
                    <Button color="primary" onClick={() => this.ff(value)} >Yes</Button>
                </td>
                <td><Button color="danger" >No</Button></td>
            </tr >
        )
    }

    ff = (value) => {
        this.setState({
            addModalShow: true,
            sendDetails: value.email
        })
    }

    openUrl = (value) => {

        var string = value;
        var iframe = "<embed width='50%' height='100%' src='" + string + "'></embed>"
        var x = window.open();
        x.document.open();
        // x.document.URL = value.id
        x.document.write(iframe);
        x.document.close();
    }

    render() {
        let addModalClose = () => {
            this.setState({
                addModalShow: false
            });
        }
        return (
            <div>
                <Table dark>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Designation</th>
                            <th>ID</th>
                            <th>Photo</th>
                            <th>University</th>
                            <th>Confirmation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userDetails.filter((val) => {
                            if (val.firstname === "") {
                                return false;
                            }
                            return true;
                        }).map(this.renderDetails)}

                    </tbody>
                </Table>

                <ShowModalCase
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                    email={this.state.sendDetails}
                />
            </div>
        );
    }
}