import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function StudentHeader(props) {
    return (
        <Fragment>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Student Dashboard</h3>
                </div>
                <ul className="list-unstyled components">
                    <li><Link to="/student/viewExam">View Exams</Link></li>
                    <li><Link to="/home">Logout</Link></li>
                </ul>
            </nav>
        </Fragment>
    );
}