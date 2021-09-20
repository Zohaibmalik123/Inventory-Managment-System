import React from 'react'
import {Container ,Nav , Navbar , NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../Navbar/navbar.css"

function NavBar(props) {
    const logout = () => {
        props.logout();
    }
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
                            <Link className="links" to="/">Dashboard</Link>
                            <Link className="links" to="/brands">Brands</Link>
                            <Link className="links" to="/category">Category</Link>
                            <Link className="links" to="/product">Products</Link>
                            <Link className="links" to="/orders">Orders</Link>
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                {/*<NavDropdown.Item href="/adduser">Add user</NavDropdown.Item>*/}
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                <NavDropdown.Item href="reprt">Report</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            </Container>
          
        </>
    )
}

export default NavBar
