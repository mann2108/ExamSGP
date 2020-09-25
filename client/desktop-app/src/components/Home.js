import React from 'react';
import { Container, Row, Col, Tooltip, Nav, NavItem, NavLink } from 'reactstrap';
import { Icon } from 'react-icons-kit';
import { desktop } from 'react-icons-kit/fa/desktop';
import { github } from 'react-icons-kit/fa/github';
import { bug } from 'react-icons-kit/fa/bug';
import { users } from 'react-icons-kit/fa/users';
import electron from '../images/icons/electron.png';
import react from '../images/icons/react.png';
import reactstrap from '../images/icons/reactstrap.png';
import reactIconsKit from '../images/icons/react-icons-kit.png';
const shell = require('electron').shell;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltips: {
        electron: false,
        react: false,
        reactstrap: false,
        reactIconsKit: false
      }
    }
  }

  toggle = (item) => () => {
    switch (item) {
      case 'electron':
        this.setState({ tooltips: { electron: !this.state.tooltips.electron } })
        break;
      case 'react':
        this.setState({ tooltips: { react: !this.state.tooltips.react } })
        break;
      case 'reactstrap':
        this.setState({ tooltips: { reactstrap: !this.state.tooltips.reactstrap } })
        break;
      case 'reactIconsKit':
        this.setState({ tooltips: { reactIconsKit: !this.state.tooltips.reactIconsKit } })
        break;
    }
  }

  handleClick = (url) => () => {
    shell.openExternal(url);
  }

  render() {
    return (
      <div>
        <h1 className='text-center space-top space-bottom'>Start Coding!</h1>
        <div className='text-center'>
          <Icon size={64} icon={desktop} />
        </div>
        <div className='text-center space-top'>
          Enjoy developing desktop apps with these technologies
        </div>
        <Container className='space-top'>
          <Row>
            <Col sm='3' className='text-center'>
              <img style={{ width: 100, height: 100, cursor: 'pointer' }}
                id='electron'
                onClick={this.handleClick('https://electronjs.org/')}
                src={electron} />
              <Tooltip placement="bottom" isOpen={this.state.tooltips.electron} target="electron" toggle={this.toggle('electron')}>
                ElectronJS
              </Tooltip>
            </Col>
            <Col sm='3' className='text-center'>
              <img style={{ width: 100, height: 100, cursor: 'pointer' }}
                id='react'
                onClick={this.handleClick('https://reactjs.org/')}
                src={react} />
              <Tooltip placement="bottom" isOpen={this.state.tooltips.react} target="react" toggle={this.toggle('react')}>
                ReactJS
              </Tooltip>
            </Col>
            <Col sm='3' className='text-center'>
              <img style={{ width: 100, height: 100, cursor: 'pointer' }}
                id='reactstrap'
                onClick={this.handleClick('https://reactstrap.github.io/')}
                src={reactstrap} />
              <Tooltip placement="bottom" isOpen={this.state.tooltips.reactstrap} target="reactstrap" toggle={this.toggle('reactstrap')}>
                reactstrap
              </Tooltip>
            </Col>
            <Col sm='3' className='text-center'>
              <img style={{ width: 100, height: 100, cursor: 'pointer' }}
                id='reactIconsKit'
                onClick={this.handleClick('https://wmira.github.io/react-icons-kit/')}
                src={reactIconsKit} />
              <Tooltip placement="bottom" isOpen={this.state.tooltips.reactIconsKit} target="reactIconsKit" toggle={this.toggle('reactIconsKit')}>
                React Icons Kit
              </Tooltip>
            </Col>
          </Row>
        </Container>,
        <Nav className='bottom-bar'>
          <NavItem className='cursor-pointer'>
            <NavLink 
              style={{color: 'gray'}}
              href="#"
              onClick={this.handleClick('https://github.com/unnamed-community/electron-reactstrap-boilerplate')}>
              <Icon icon={github} /> View on Github
            </NavLink>
          </NavItem>
          <NavItem className='cursor-pointer'>
            <NavLink 
              style={{color: 'gray'}}
              href="#"
              onClick={this.handleClick('https://github.com/unnamed-community/electron-reactstrap-boilerplate/issues')}>
              <Icon icon={bug} /> Report a bug
            </NavLink>
          </NavItem>
          <NavItem className='cursor-pointer'>
            <NavLink 
              style={{color: 'gray'}}
              href="#"
              onClick={this.handleClick('https://github.com/unnamed-community/electron-reactstrap-boilerplate/graphs/contributors')}>
              <Icon icon={users} /> Credits
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}