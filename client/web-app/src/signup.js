import Axios from 'axios';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import dashboard from './dashboard';
import { Input } from '@material-ui/core';

export default class signup extends React.Component {

    constructor() {
        super()
        const useStyles = makeStyles((theme) => ({
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            avatar: {
                margin: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main,
            },
            form: {
                width: '100%', // Fix IE 11 issue.
                marginTop: theme.spacing(3),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
        }));
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            id: '',
            idName: '',
            photo: '',
            photoName: '',
            university: '',
            designation: '',
            classes: useStyles,
        }
    }

    sendValues = (event) => {

        event.preventDefault();

        if ((this.state.firstname === '') || (this.state.lastname === '') || (this.state.email === '') || (this.state.id === '') || (this.state.photo === '') || (this.state.university === '') || (this.state.designation === '' || this.state.idName === '' || this.state.photoName === '')) {
            alert("Enter All Details.. ");
        }
        else {
            if (/^([\w\d](\.)*)+\@([\w\.]{1,2})+(\w)$/.test(this.state.email) && (this.state.firstname.length >= 3) && (this.state.lastname.length >= 3) && (this.state.university.length >= 3) && (this.state.designation.length >= 2)) {
                const details = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    id: this.state.id,
                    photo: this.state.photo,
                    university: this.state.university,
                    designation: this.state.designation,
                    idName: this.state.idName,
                    photoName: this.state.photoName
                }
                // console.log(details)

                Axios.post("http://localhost:5000/signup", { details })
                    .then(res => {
                        alert(res.data.statusMessage);
                        this.setState({
                            firstname: '',
                            lastname: '',
                            email: '',
                            id: '',
                            idName: '',
                            photo: '',
                            photoName: '',
                            university: '',
                            designation: '',
                        });
                        Array.from(document.querySelectorAll("input")).forEach(
                            input => (input.value = '')
                        );


                    })
                    .catch((err) => {
                        alert(err.response.data.error);
                        // console.log(err.data.statusMessage, "Inside Catch");
                    });
            }
            else {
                alert("Enter Proper Details");
            }

        }


    }

    handleInputChange = e => {
        let inputValue = e.target.value.trim();
        // console.log(inputValue)
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    fileUpload = e => {

        let files = e.target.files
        // console.log(files);

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (file) => {
            this.setState({
                id: file.target.result,
                idName: files[0].name
            });
        }
    }

    photoUpload = e => {
        // console.log(e.target.files[0].name)
        let files = e.target.files;
        console.log(files[0].name);

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (file) => {
            console.log(files[0].name)
            // console.log(file[0].result.name)
            this.setState({
                photo: file.target.result,
                photoName: files[0].name
            });
        }
    }

    render() {
        return (
            <div>
                <Container component="main" maxWidth="xs" dark>
                    <CssBaseline />
                    <div className={this.state.classes.paper}>
                        <Typography component="h1" variant="h5" style={{marginTop: '20%', marginBottom: '10%'}}>
                            Register Your Organization
                        </Typography>
                        <form className={this.state.classes.form} noValidate onSubmit={this.sendValues}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstname"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="First Name"
                                        autoFocus
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Last Name"
                                        name="lastname"
                                        autoComplete="lname"
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="university"
                                        label="University"
                                        autoComplete="university"
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="designation"
                                        label="Employee Designation"
                                        autoComplete="Employee Designation"
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                    variant="contained"
                                    component="label"
                                    >
                                        Upload ID Proof
                                        <Input
                                        type="file"
                                        onChange={this.fileUpload}
                                        name="id"
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                    variant="contained"
                                    component="label"
                                    >
                                        Upload Photo
                                        <Input
                                        type="file"
                                        onChange={this.photoUpload}
                                        name="photo"
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={this.state.classes.submit}
                                style={{marginTop: '4%'}}
                            >
                                Register 
                            </Button>
                        </form>
                    </div>

                </Container>
            </div>

            // <div style={{ flex: 1, marginLeft: '1vh' }}>
            //     <Form onSubmit={this.sendValues}>
            //         <Row form>
            //             <Col md={2} xs={2}>
            //                 <FormGroup>
            //                     <Label>First Name</Label>
            //                     <Input type="text" name="firstname" onChange={this.handleInputChange} />
            //                 </FormGroup>
            //             </Col>
            //             <Col md={2} xs={2}>
            //                 <FormGroup>
            //                     <Label>Last Name</Label>
            //                     <Input type="text" name="lastname" onChange={this.handleInputChange} />
            //                 </FormGroup>
            //             </Col>
            //         </Row>
            //         <Row>
            //             <Col md={3}>
            //                 <FormGroup>
            //                     <Label>Email</Label>
            //                     <Input type="email" name="email" onChange={this.handleInputChange} />
            //                 </FormGroup>
            //             </Col>
            //         </Row>
            //         <Row>
            //             <Col md={2}>
            //                 <FormGroup>
            //                     <Label>University Name</Label>
            //                     <Input type="text" name="university" onChange={this.handleInputChange} />
            //                 </FormGroup>
            //             </Col>
            //             <Col md={2}>
            //                 <FormGroup>
            //                     <Label>Employee Designation</Label>
            //                     <Input type="text" name="designation" onChange={this.handleInputChange} />
            //                 </FormGroup>
            //             </Col>
            //         </Row>

            //         <Row>
            //             <Col md={2}>
            //                 <FormGroup>
            //                     <Label>Upload ID Proof</Label>
            //                     <Input type="file" name="id" onChange={this.fileUpload} />
            //                 </FormGroup>
            //             </Col>
            //             <Col md={2}>
            //                 <FormGroup>
            //                     <Label>Upload Photo</Label>
            //                     <Input type="file" name="photo" onChange={this.photoUpload} />
            //                 </FormGroup>
            //             </Col>
            //         </Row>
            //         <Button type="submit" color="primary">Submit</Button>
            //     </Form>
            // </div>
        )
    }
}