import React, { Component, Fragment } from 'react';
import FacultyHeader from './FacultyHeader';
import { Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
const axios = require('axios');
const shell = require('electron').shell;
class ViewExams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            cookie : "",
            exams: ""
        }
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
                orgId : orgId,
                exams : ""
            },
        });

        this.setState({
            loader: true
        });

        let self = this;

        axios.post("http://localhost:5000/viewExam",{
            user : email
        })
        .then((Data) => {
            console.log(Data);
            self.setState({
                loader : false,
                exams : Data.data.exams[0].exam
            });
        })
        .catch((err) => {
            console.log(err)
            self.setState({
                loader: false
            });
        })
    }

    render() {
        let showExams = [];
        if (this.state.exams === "") {
            showExams.push(
                <p>
                    Failed to fetch data.
                </p>
            );
        } else if (this.state.exams.length === 0) {
            showshowExams.push(
                <p>
                    No exam found!
                </p>
            );
        } else {
            for (let i = 0; i < this.state.exams.length; i++) {
                let color = "info";
                if (i % 2) color = "danger"
                showExams.push(
                    <Card body inverse color={color} style={{ margin: 10 }}>
                        <CardText>Subject Name : {this.state.exams[i].subjectName}</CardText>
                        <CardText>Exam Date : {this.state.exams[i].examDate}</CardText>
                        <CardText>Exam Duration : {this.state.exams[i].examDuration}</CardText>
                        <CardText>Exam Description : {this.state.exams[i].examDescription}</CardText>
                        <CardText>Exam Link :<a onClick={() => shell.openExternal(this.state.exams[i].formLink)} className="article">CLICK HERE</a></CardText>
                    </Card>
                );
            }
        }
        return (
            <Fragment>
                <div className="wrapper">
                    <FacultyHeader />
                    <div id="content">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/faculty"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
                                <BreadcrumbItem active>All Exams</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={this.state.loader}
                        />
                        {showExams}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ViewExams;
