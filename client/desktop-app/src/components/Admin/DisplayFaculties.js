import React, { Component, Fragment } from 'react';
import AdminHeader from './AdminHeader';
import { Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
const axios = require('axios');
class DisplayFaculties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faculties: "",
            loader: false
        }
    }

    componentDidMount() {
        this.setState({
            loader: true
        });
        let self = this;
        axios.get("http://localhost:5000/getUsers/faculties")
            .then((facultiesData) => {
                self.setState({
                    faculties: facultiesData.data.users,
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
        let showFaculties = [];
        if (this.state.faculties === "" && this.state.loader === false) {
            showFaculties.push(
                <p>
                    Failed to fetch data.
                </p>
            );
        } else if (this.state.faculties === "") {
            // Nothing to do
        } else if (this.state.faculties.length === 0) {
            showFaculties.push(
                <p>
                    No faculty found!
                </p>
            );
        } else {
            for (let i = 0; i < this.state.faculties.length; i++) {
                let color = "info";
                if (i % 2) color = "danger"
                showFaculties.push(
                    <Card body inverse color={color} style={{ margin: 10 }}>
                        <CardTitle>ID : {this.state.faculties[i]._id}</CardTitle>
                        <CardText>Email : {this.state.faculties[i].email}</CardText>
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
                                <BreadcrumbItem active> Display Faculties</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={this.state.loader}
                        />
                        {showFaculties}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default DisplayFaculties;
