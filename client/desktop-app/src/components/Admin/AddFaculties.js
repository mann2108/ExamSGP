import React, { Component, Fragment } from 'react';
import AdminHeader from './AdminHeader';
import { Breadcrumb, BreadcrumbItem, Jumbotron, Table, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import { ExcelRenderer } from 'react-excel-renderer';

class AdminDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: "",
            cols: "",
            uploadedFlag: false
        }
        this.fileHandler = this.fileHandler.bind(this);
    }

    fileHandler = (event) => {
        let fileObj = event.target.files[0];
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {           
                this.setState({
                    cols: "",
                    rows: "",
                    uploadedFlag: false
                });
            }
            else {
                this.setState({
                    cols: resp.cols,
                    rows: resp.rows,
                    uploadedFlag: true
                });
            }
        });
    }

    render() {
        let displayUploadedData = [];
        let data = [];
        for(let i = 1; i<this.state.rows.length; i++) {
            if(!this.state.rows[i][0])break;
            data.push(
                <tr>
                    <td>{this.state.rows[i][0]}</td>
                    <td>{this.state.rows[i][1]}</td>
                    <td>{this.state.rows[i][2]}</td>
                    <td>{this.state.rows[i][3]}</td>        
                </tr>
            );
        }
        if(this.state.uploadedFlag) {
            displayUploadedData.push(
                <div>
                    <Table dark>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </Table>
                    <Button color="success" size="lg">Generate Credentials</Button>{' '}
                </div>
            );
        } else {

        }
        return (
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
                        </div>
                        <Jumbotron>
                            <div>
                                <h2>Follows the steps to add faculties</h2>
                                <p style={{ fontSize: 15 }}>
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
                            <div style={{ borderStyle: 'dashed' }}><center><h3>Upload File</h3></center><input type="file" onChange={this.fileHandler.bind(this)} style={{ "padding": "10px" }} /></div>
                        </ul>
                        {displayUploadedData}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default AdminDashboard;
