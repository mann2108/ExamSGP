import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function FacultyHeader(props) {
    return (
        <Fragment>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Faculty Dashboard</h3>
                </div>
                <ul className="list-unstyled components">
                    <li><Link to="/faculty/viewExam">View Created Exams</Link></li>
                    <li><Link to="/faculty/createExam">Create Exam</Link></li>
                    <li><Link to="/home">Logout</Link></li>
                </ul>
            </nav>
        </Fragment>
    );
}