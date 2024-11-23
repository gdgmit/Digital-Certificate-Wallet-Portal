import React from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";

function NavBar() {
    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg">
            <Container>
                <BootstrapNavbar.Brand href="#">
                    Digital Certificate Wallet
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
                <BootstrapNavbar.Collapse id="navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#view">View PDF</Nav.Link>
                        <Nav.Link href="#download">Download</Nav.Link>

                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>

        </BootstrapNavbar>
    );
};

export default NavBar;