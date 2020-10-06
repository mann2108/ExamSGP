import React, { Component,Fragment } from 'react';
import AdminHeader from './AdminHeader';
import {Container, Row, Col, Breadcrumb, BreadcrumbItem, Jumbotron} from 'reactstrap';
import {Link} from 'react-router-dom';
class DisplayStudents extends Component {
  render() {
    return(
      <Fragment>
          <div className="wrapper">
            <AdminHeader />
            <div id="content">
            <div className="row">
                    <Breadcrumb>
                    <BreadcrumbItem><Link to="/admin"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
                        <BreadcrumbItem active> Display Students</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Admin Dashboard</h3>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
      </Fragment>
    );
  }
}

export default DisplayStudents;
