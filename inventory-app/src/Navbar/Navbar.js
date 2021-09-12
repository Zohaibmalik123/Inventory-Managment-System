import React from 'react'
import {Container ,Nav , Navbar , NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../Navbar/navbar.css"

function NavBar() {
    return (
        <>
          <Container>
            <Navbar className="Header" expand="lg">
                <div className="container header">
                    {/* <img src={logo} alt="loading" style={{ height: "56px" }} /> */}
                    <Navbar.Brand className="logo" to="#">IMS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                        <Link className="links" to="/">Login</Link>
                            <Link className="links" to="/dashboard">Dashboard</Link>
                            <Link className="links" to="/brand">Brands</Link>
                            <Link className="links" to="/category">Category</Link>
                            <Link className="links" to="/product">Products</Link>
                            <Link className="links" to="/order">Orders</Link>
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/adduser">Add user</NavDropdown.Item>
                                <NavDropdown.Item href="/Logout">Logout</NavDropdown.Item>
                                <NavDropdown.Item href="reprt">Report</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            </Container>




            {/* <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Dashboard</Nav.Link>
                            <Nav.Link href="/brand">Brands</Nav.Link>
                            <Nav.Link href="/category">Category</Nav.Link>
                            <Nav.Link href="/product">Products</Nav.Link>
                            <Nav.Link href="/order">Orders</Nav.Link>
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/adduser">Add user</NavDropdown.Item>
                                <NavDropdown.Item href="/Logout">Logout</NavDropdown.Item>
                                <NavDropdown.Item href="reprt">Report</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
        </>
    )
}

export default NavBar
