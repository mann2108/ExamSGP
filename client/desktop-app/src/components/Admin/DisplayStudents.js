import React, { Component, Fragment } from 'react';
import AdminHeader from './AdminHeader';
import { Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
const axios = require('axios');
class DisplayStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: "",
            loader: false
        }
    }

    componentDidMount() {
        this.setState({
            loader: true
        });
        let self = this;
        axios.get("http://localhost:5000/getUsers/students")
            .then((studentsData) => {
                self.setState({
                    students: studentsData.data.users,
                    loader: false
                });
            })
            .catch((err) => {
                self.setState({
                    loader: false
                });
            })
    }
    render() {
        let showStudents = [];
        if (this.state.students === "" && this.state.loader === false) {
            showStudents.push(
                <p>
                    Failed to fetch data.
      </p>
            );
        } else if (this.state.students === "") {
            // Nothing to do
        } else if (this.state.students.length === 0) {
            showStudents.push(
                <p>
                    No student found!
        </p>
            );
        } else {
            for (let i = 0; i < this.state.students.length; i++) {
                let color = "info";
                if (i % 2) color = "danger"
                showStudents.push(
                    <Card body inverse color={color} style={{ margin: 10 }}>
                        <CardTitle>ID : {this.state.students[i]._id}</CardTitle>
                        <CardText>Email : {this.state.students[i].email}</CardText>
                    </Card>
                );
            }
        }
        return (
            <Fragment>
                <div className="wrapper">
                    <AdminHeader />
                    <div id="content">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/admin"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
                                <BreadcrumbItem active> Display Students</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={this.state.loader}
                        />
                        {showStudents}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default DisplayStudents;
