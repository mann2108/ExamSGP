import React, { Component, Fragment } from 'react';
import StudentHeader from './StudentHeader';
import { Breadcrumb, BreadcrumbItem, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
class StudentDashboard extends Component {
    render() {
        return (
            <Fragment>
                <div className="wrapper">
                <StudentHeader />
                    <div id="content">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/home"><i className="fa fa-home fa-sm"></i> Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active> Student</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>Student Dashboard</h3>
                                <hr />
                            </div>
                        </div>
                        <Jumbotron>
                            <div>
                                <h1>Welcome.. Student</h1>
                                <p>
                                    Student can give exams assigned by faculties.
                                </p>
                            </div>
                        </Jumbotron>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default StudentDashboard;
