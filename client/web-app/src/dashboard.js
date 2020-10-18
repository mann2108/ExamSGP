import Axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, NavLink, Table } from 'reactstrap';
import { Image, Modal } from 'react-bootstrap';
import ShowModalCase from './ShowModalCase';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HourglassEmptySharpIcon from '@material-ui/icons/HourglassEmptySharp';
import DoneSharpIcon from '@material-ui/icons/DoneSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import 'bootstrap/dist/css/bootstrap.min.css';
const drawerWidth = 240;


export default class dashboard extends React.Component {
    constructor() {
        super();
        const useStyles = makeStyles((theme) => ({
            root: {
                display: 'flex',
            },
            toolbar: {
                paddingRight: 24, // keep right padding when drawer closed
            },
            toolbarIcon: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0 8px',
                ...theme.mixins.toolbar,
            },
            appBar: {
                zIndex: theme.zIndex.drawer + 1,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
            },
            appBarShift: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
            menuButton: {
                marginRight: 36,
            },
            menuButtonHidden: {
                display: 'none',
            },
            title: {
                flexGrow: 1,
            },
            drawerPaper: {

                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
            drawerPaperClose: {

                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            },
            appBarSpacer: theme.mixins.toolbar,
            content: {
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            },
            container: {
                paddingTop: theme.spacing(4),
                paddingBottom: theme.spacing(4),
            },
            paper: {
                padding: theme.spacing(2),
                display: 'flex',
                overflow: 'auto',
                flexDirection: 'column',
            },
            fixedHeight: {
                height: 240,
            },
            fixedHeightPaper: {
                height: 240,
                padding: theme.spacing(2),
                display: 'flex',
                overflow: 'auto',
                flexDirection: 'column',
            }
        }))
        this.state = {
            modalHeader: '',
            userDetails: '',
            sendDetails: '',
            open: false,
            setOpen: true,
            classes: useStyles,
            currentView: 'pending',
        }

    }

    handleDrawerOpen = () => {
        this.setState({
            open: true,
        });
    }

    handleDrawerClose = () => {
        this.setState({
            open: false,
        });
    }

    componentDidMount() {
        this.pendingReq();
    }

    renderDetails = (value, index) => {
        let style;
        if (this.state.currentView === 'pending') {
            style = false
        }
        else {
            style = true
        }
        return (
            <tr key={index}>
                <td>{value.firstname} </td>
                <td>{value.lastname} </td>
                <td>{value.email} </td>
                <td>{value.designation} </td>
                <td>
                    <a href="#" onClick={() => this.openUrl(value.id)}>{value.idName}</a>
                </td>
                <td>
                    <a href="#" onClick={() => this.openUrl(value.photo)}>{value.photoName}</a>
                </td>
                <td>{value.university}</td>
                <td>
                    <Button color="primary" disabled={style} onClick={() => this.ff(value)} >Yes</Button>
                </td>
                <td>
                    <Button color="danger" disabled={style} onClick={() => this.fail(value)}>No</Button>
                </td>
            </tr >
        )
    }

    fail = (value) => {
        this.setState({
            modalHeader: 'Application Rejected',
            sendDetails: value.email,
            addModalShow: true,
        })
    }

    ff = (value) => {
        this.setState({
            modalHeader: 'Application Accepted',
            sendDetails: value.email,
            addModalShow: true,
        })
    }

    openUrl = (value) => {

        var string = value;
        var iframe = "<embed width='50%' height='100%' src='" + string + "'></embed>"
        var x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();
    }

    acceptedReq = () => {
        this.handleDrawerClose();
        Axios.get("http://localhost:5000/accepted")
            .then((res) => {
                let values = res.data;
                this.setState({
                    userDetails: values,
                    currentView: 'accepted'
                });
            })
            .catch((err) => console.log(err));
    }

    rejectedReq = () => {
        this.handleDrawerClose();
        Axios.get("http://localhost:5000/rejected")
            .then((res) => {
                let values = res.data;
                this.setState({
                    userDetails: values, 
                    currentView: 'rejected'
                });
            })
            .catch((err) => console.log(err))
    }

    pendingReq = () => {
        this.handleDrawerClose();
        Axios.get('http://localhost:5000/dashboard')
            .then((res) => {
                let values = res.data;
                let details = [];
                this.setState({
                    userDetails: values,
                    currentView: 'pending'
                })
            })
            .catch((err) => console.log(err));
    }

    render() {
        let addModalClose = () => {
            this.setState({
                addModalShow: false
            });
        }

        let showData = [];
        for (let i = 0; i < this.state.userDetails.length; i++) {
            showData.push(this.renderDetails(this.state.userDetails[i], i))
        }

        return (
            <div>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(this.state.classes.appBar, this.state.open && this.state.classes.appBarShift)}>
                    <Toolbar className={this.state.classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={clsx(this.state.classes.menuButton, this.state.open && this.state.classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={this.state.classes.title}>
                            Dashboard
          </Typography>

                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor="left"
                    variant="temporary"
                    classes={{
                        paper: clsx(this.state.classes.drawerPaper, !this.state.open && this.state.classes.drawerPaperClose)
                    }}
                    open={this.state.open}
                >
                    <div className={this.state.classes.toolbarIcon} style={{ marginTop: '12%' }} >
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Show Pending Requests"
                            onClick={this.pendingReq}
                        >
                            <HourglassEmptySharpIcon />Pending
                        </IconButton>
                    </List>
                    <Divider />
                    <List>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Accepted Requests"
                            onClick={this.acceptedReq}
                        >
                            <DoneSharpIcon />Accepted
                        </IconButton>
                    </List>
                    <Divider />
                    <List>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Accepted Requests"
                            onClick={this.rejectedReq}
                        >
                            <CloseSharpIcon />Rejected
                        </IconButton>
                    </List>
                </Drawer>
                <Table dark
                    style={{ marginTop: '8vh' }}
                >
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Designation</th>
                            <th>ID</th>
                            <th>Photo</th>
                            <th>University</th>
                            <th>Confirmation</th>
                        </tr>
                    </thead>
                    <tbody id="bodyid">
                        {showData}
                    </tbody>
                </Table>

                <ShowModalCase
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                    email={this.state.sendDetails}
                    header={this.state.modalHeader}
                />
            </div>
        );
    }
}