import React, { Component,Fragment } from 'react';
import AdminHeader from './AdminHeader';
import {Container, Row, Col, Breadcrumb, BreadcrumbItem, Jumbotron} from 'reactstrap';
import {Link} from 'react-router-dom';
class AdminDashboard extends Component {
  render() {
    return(
      <Fragment>
          <div className="wrapper">
            <AdminHeader />
            <div id="content">
            <div className="row">
                    <Breadcrumb>
                    <BreadcrumbItem><Link to="/admin"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
                        <BreadcrumbItem active> Display Users</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Admin Dashboard</h3>
                        <hr />
                    </div>
                </div>
                <Jumbotron>

                  <div>
                      <h1>Welcome.. Admin</h1>
                      <p>
                          Admin can manage users through<br />
                          Add and View (Users)
                      </p>
                  </div>
                </Jumbotron>
            </div>
        </div>
          
          

      </Fragment>
    );
  }
}

export default AdminDashboard;
