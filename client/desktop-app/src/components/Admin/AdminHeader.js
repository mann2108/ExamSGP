import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function  AdminHeader(props) {
    return(
        <Fragment>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Admin Dashboard</h3>
                </div>

                <ul className="list-unstyled components">
                    <li><Link to="/admin/faculties">Add Faculties</Link></li>
                    <li><Link to="/admin/students"> Add Students</Link></li>
                    <li><Link to="/admin/admins">Add Admins</Link></li>
                    <li><Link to="/admin/display">Display Users</Link></li>
                    <li><Link to="/home">Logout</Link></li>
                </ul>

                
            </nav>
        </Fragment>
    );
}