import "./Navigation-Pane.css";
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import shortid from "shortid";


function NavigationPane({navigationList}){
    const links = navigationList.map(entry =>
        <Nav.Link key={shortid.generate()} href={`${entry['path']}`}>
            {entry['name']}
        </Nav.Link>
    )
    return (
        <Navbar bg="dark" variant="dark" expand="lg" >
            <Container className="Nav">
                <Navbar.Brand href="/">Legacy's Allure</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />  
                <Navbar.Collapse>
                    <Nav className="Nav-pane">
                        {links}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavigationPane