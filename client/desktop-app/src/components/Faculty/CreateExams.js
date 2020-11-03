import React, { Component, Fragment } from 'react';
import FacultyHeader from './FacultyHeader';
import { Breadcrumb, BreadcrumbItem, Jumbotron, Table, Button } from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
import { ExcelRenderer } from 'react-excel-renderer';
const shell = require('electron').shell;
const axios = require('axios');
class CreateExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: "",
            cols: "",
            uploadedFlag: false,
            showSpinner: false,
            showMessage: "none",
            message: "",
            cookie: "",
        }
        this.fileHandler = this.fileHandler.bind(this);
        this.createExam = this.createExam.bind(this);
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

    createExam = () => {
        let formURL = document.getElementById("formLink").value;
        if(!formURL) {
            alert("Please enter google form link");
        } else {
            this.setState({
                showSpinner: true,
                showMessage: "none",
                message: ""
            });

            let reqBody = [];
            reqBody.push({
                email : this.state.cookie.email,
                formLink : formURL
            })
            for (let i = 1; i < this.state.rows.length; i++) {
                if (!this.state.rows[i][0]) break;
                reqBody.push({
                    email: this.state.rows[i][1],
                    formLink : formURL
                });
            }
            var self = this;
            axios.post('http://localhost:5000/createExam', {
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
        console.log(this.state.cookie);
        let displayUploadedData = [];
        let data = [];
        for (let i = 1; i < this.state.rows.length; i++) {
            if (!this.state.rows[i][0]) break;
            data.push(
                <tr>
                    <td>{this.state.rows[i][0]}</td>
                    <td>{this.state.rows[i][1]}</td>
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
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </Table>
                    Form Link : <input id="formLink" name="formLink" type="text"></input><br />
                    <Button color="success" onClick={() => this.createExam()} size="lg">Create Exam</Button>{' '}
                    <ClipLoader
                        size={50}
                        color={"#123abc"}
                        loading={this.state.showSpinner}
                    />
                    <p style={{ display: this.state.showMessage }}>{this.state.message}</p>

                </div>
            );
        }
        return (
            <Fragment>
                <div className="wrapper">
                    <FacultyHeader />
                    <div id="content">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/faculty"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
                                <BreadcrumbItem active> Create Exam</BreadcrumbItem>
                            </Breadcrumb>
                            <hr />
                        </div>
                        <Jumbotron>
                            <div>
                                <h2>Follows the steps to create exam</h2>
                                <p style={{ fontSize: 15 }}>
                                    1. Download the sample excel file<br />
                                    2. Edit the downloaded file as per the file formats<br />
                                    3. Upload the final file<br />
                                    4. Create a google form <a onClick={() => shell.openExternal("http://forms.google.com/")} className="article"> CLICK HERE</a><br />
                                    5. Add the form link below<br />
                                    6. Hit Genearte Exam<br />
                                    7. Wait for sometime until exam created...<br />
                                </p>
                            </div>
                        </Jumbotron>

                        <ul className="list-unstyled CTAs">
                            <li><a onClick={() => shell.openExternal("https://drive.google.com/file/d/1fZ1VETvLAPYCLwkAH4Gtv6Na8-1KGtfN/view?usp=sharing")} className="article">Download sample document</a></li>
                            <div style={{ borderStyle: 'dashed' }}><center><h3>Upload File</h3></center><input type="file" onChange={this.fileHandler.bind(this)} style={{ "padding": "10px" }} /></div>
                        </ul>
                        {displayUploadedData}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CreateExam;
