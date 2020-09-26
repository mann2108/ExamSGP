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
                        <BreadcrumbItem active> Add Faculties</BreadcrumbItem>
                    </Breadcrumb>
                    <hr />
                    {/* <div className="col-12">
                        <h3></h3>
                        
                    </div> */}
                </div>
                <Jumbotron>

                  <div>
                      <h2>Follows the steps to add faculties</h2>
                      <p style={{fontSize:15}}>
                          1. Download the sample excel file<br />
                          2. Edit the downloaded file as per the file formats<br />
                          3. Upload the final file<br />
                          4. Hit Add<br />
                          5. Wait for sometime until all faculties credentials generated...<br />
                      </p>
                  </div>
                </Jumbotron>

                <ul className="list-unstyled CTAs">
                    <li><a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="article">Download sample document</a></li>
                    <li><input type="file"/></li>

                </ul>
            </div>
        </div>
          
          

      </Fragment>
    );
  }
}

export default AdminDashboard;
