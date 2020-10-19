import React, { Component, Fragment } from 'react';
// import FacultyHeader from './FacultyHeader';
import { Breadcrumb, BreadcrumbItem, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
class FacultyDashboard extends Component {
    render() {
        return (
            // <Fragment>
            //     <div className="wrapper">
            //         {/* <FacultyHeader /> */}
            //         <div id="content">
            //             <div className="row">
            //                 <Breadcrumb>
            //                     <BreadcrumbItem><Link to="/home"><i className="fa fa-home fa-sm"></i> Home</Link></BreadcrumbItem>
            //                     <BreadcrumbItem active> Faculty</BreadcrumbItem>
            //                 </Breadcrumb>
            //                 <div className="col-12">
            //                     <h3>Faculty Dashboard</h3>
            //                     <hr />
            //                 </div>
            //             </div>
            //             <Jumbotron>
            //                 <div>
            //                     <h1>Welcome.. Faculty</h1>
            //                     <p>
            //                         Faculty can create/manage exams and results.
            //                     </p>
            //                 </div>
            //             </Jumbotron>
            //         </div>
            //     </div>
            // </Fragment>

            <Fragment>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Admin Dashboard</h3>
                </div>
                <ul className="list-unstyled components">
                    <li><Link to="/admin/faculties">Add Faculties</Link></li>
                    <li><Link to="/admin/students"> Add Students</Link></li>
                    <li><Link to="/admin/admins">Add Admins</Link></li>
                    <li><Link to="/admin/display/faculties">Display Faculties</Link></li>
                    <li><Link to="/admin/display/students">Display students</Link></li>
                    <li><Link to="/admin/display/admins">Display admins</Link></li>
                    <li><Link to="/home">Logout</Link></li>
                </ul>
            </nav>
        </Fragment>
        );
    }
}

export default FacultyDashboard;
