import React, { Component, Fragment } from 'react';
import AdminHeader from './AdminHeader';
import { Breadcrumb, BreadcrumbItem, Jumbotron, Table, Button } from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
import { ExcelRenderer } from 'react-excel-renderer';
const axios = require('axios');
const shell = require('electron').shell;
class AddFaculties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: "",
            cols: "",
            uploadedFlag: false,
            showSpinner: false,
            showMessage: "none",
            message: "",
            cookie: ""
        }
        this.fileHandler = this.fileHandler.bind(this);
        this.addFaculties = this.addFaculties.bind(this);
    }

    componentDidMount() {
        let temp = document.cookie.split("; ");
        let email = temp[0].split("=")[1];
        let role = temp[1].split("=")[1];
        let orgId = temp[2].split("=")[1];
        this.setState({
            cookie : {
                email : email,
                role : role,
                orgId : orgId
            }
        });
    }

    addFaculties = () => {
        this.setState({
            showSpinner: true,
            showMessage: "none",
            message: ""
        });

        let reqBody = [];
        for (let i = 1; i < this.state.rows.length; i++) {
            if (!this.state.rows[i][0]) break;
            reqBody.push({
                email: this.state.rows[i][3],
                role: "faculty",
                orgId: this.state.cookie.orgId
            });
        }
        var self = this;
        axios.post('http://localhost:5000/addUser', {
            users: reqBody
        })
            .then(function (response) {
                console.log(self.state);
                self.setState({
                    showSpinner: false,
                    showMessage: "block",
                    message: response.data.status
                });
                console.log(response);
            })
            .catch(function (error) {
                console.log(self.state);
                self.setState({
                    showSpinner: false,
                    showMessage: "block",
                    message: "Server under maintainance, try again later or contact backend team for the updates"
                });
            });
    }

    fileHandler = (event) => {
        let fileObj = event.target.files[0];
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                this.setState({
                    cols: "",
                    rows: "",
                    uploadedFlag: false
                });
            }
            else {
                this.setState({
                    cols: resp.cols,
                    rows: resp.rows,
                    uploadedFlag: true
                });
            }
        });
    }

    render() {
        let displayUploadedData = [];
        let data = [];
        for (let i = 1; i < this.state.rows.length; i++) {
            if (!this.state.rows[i][0]) break;
            data.push(
                <tr>
                    <td>{this.state.rows[i][0]}</td>
                    <td>{this.state.rows[i][1]}</td>
                    <td>{this.state.rows[i][2]}</td>
                    <td>{this.state.rows[i][3]}</td>
                </tr>
            );
        }
        if (this.state.uploadedFlag) {
            displayUploadedData.push(
                <div>
                    <Table dark>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </Table>
                    <Button color="success" onClick={() => this.addFaculties()} size="lg">Generate Credentials</Button>{' '}
                    <ClipLoader
                        size={50}
                        color={"#123abc"}
                        loading={this.state.showSpinner}
                    />
                    <p style={{ display: this.state.showMessage }}>{this.state.message}</p>

                </div>
            );
        } else {

        }
        return (
            <Fragment>
                <div className="wrapper">
                    <AdminHeader />
                    <div id="content">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/admin"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
                                <BreadcrumbItem active> Add Faculties</BreadcrumbItem>
                            </Breadcrumb>
                            <hr />
                        </div>
                        <Jumbotron>
                            <div>
                                <h2>Follows the steps to add faculties</h2>
                                <p style={{ fontSize: 15 }}>
                                    1. Download the sample excel file<br />
                                    2. Edit the downloaded file as per the file formats<br />
                                    3. Upload the final file<br />
                                    4. Hit Generate Credentials<br />
                                    5. Wait for sometime until all faculties credentials generated...<br />
                                </p>
                            </div>
                        </Jumbotron>

                        <ul className="list-unstyled CTAs">
                        <li><a onClick={() => shell.openExternal("https://drive.google.com/file/d/1VG-S--EotQkm2LiuDMq8sc1wwk9XaOOo/view?usp=sharing")} className="article">Download sample document</a></li>
                            <div style={{ borderStyle: 'dashed' }}><center><h3>Upload File</h3></center><input type="file" onChange={this.fileHandler.bind(this)} style={{ "padding": "10px" }} /></div>
                        </ul>
                        {displayUploadedData}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default AddFaculties;
