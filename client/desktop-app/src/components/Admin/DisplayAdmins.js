import React, { Component,Fragment } from 'react';
import AdminHeader from './AdminHeader';
import {Container, Row, Col, Breadcrumb, BreadcrumbItem, Jumbotron} from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import {Link} from 'react-router-dom';
const axios = require('axios');
class DIsplayAdmins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins : "",
      loader : false
    }
  }
  componentDidMount() {
    this.setState({
      loder : true
    });
    axios.get("http://localhost:5000/getUsers/admins")
    .then((adminsData) => {
      this.setState({
        admins : adminsData,
        loader : false
      });
    })
    .catch((err) => {
      this.setState({
        loader : false
      });
    })
  }

  render() {
    let showAdmins = [];
    if(this.state.admins==="") {

    } else if(this.state.admins.length===0) {

    } else {

    }
    return(
      <Fragment>
          <div className="wrapper">
            <AdminHeader />
            <div id="content">
            <div className="row">
                    <Breadcrumb>
                    <BreadcrumbItem><Link to="/admin"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Display Admins</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Admin Dashboard</h3>
                        <hr />
                    </div>
                </div>
            </div>
            <ClipLoader
              size={50}
              color={"#123abc"}
              loading={this.state.loader}
            />
            {showAdmins}
        </div>
      </Fragment>
    );
  }
}

export default DIsplayAdmins;
