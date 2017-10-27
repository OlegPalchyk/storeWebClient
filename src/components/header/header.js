import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav , NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
class Header extends Component {
  render() {

    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to='/'>Test Project</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <LinkContainer to="/">
                        <NavItem eventKey={1}>Home</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/create-item">
                        <NavItem eventKey={2}>Create Item</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );
  }
}

export default Header;
