import React, { Component, Fragment } from 'react';
import AdminHeader from './AdminHeader';
import { Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
const axios = require('axios');
class DIsplayAdmins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admins: "",
            loader: false
        }
    }
    componentDidMount() {
        this.setState({
            loader: true
        });
        let self = this;
        axios.get("http://localhost:5000/getUsers/admins")
            .then((adminsData) => {
                self.setState({
                    admins: adminsData.data.users,
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
        let showAdmins = [];
        if (this.state.admins === "" && this.state.loader === false) {
            showAdmins.push(
                <p>
                    Failed to fetch data.
      </p>
            );
        } else if (this.state.admins === "") {
            // Nothing to do
        } else if (this.state.admins.length === 0) {
            showAdmins.push(
                <p>
                    No admin found!
        </p>
            );
        } else {
            for (let i = 0; i < this.state.admins.length; i++) {
                let color = "info";
                if (i % 2) color = "danger"
                showAdmins.push(
                    <Card body inverse color={color} style={{ margin: 10 }}>
                        <CardTitle>ID : {this.state.admins[i]._id}</CardTitle>
                        <CardText>Email : {this.state.admins[i].email}</CardText>
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
                                <BreadcrumbItem active>Display Admins</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={this.state.loader}
                        />
                        {showAdmins}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default DIsplayAdmins;
