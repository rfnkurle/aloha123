import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import Auth from "../utils/auth";
import "../styles/Navbar.css";

const AppNavbar = () => {
  return (
    <>
      <Navbar fluid id="navbar" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            aloHā{" "}
          </Navbar.Brand>
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto myNav">
              {/* if user is logged in show link for feed, profiles and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link className="navLink" as={Link} to="/dashboard">
                    Your Feed
                  </Nav.Link>
                  <Nav.Link className="navLink" as={Link} to="/locals">
                    Local Profiles
                  </Nav.Link>
                  <Nav.Link className="navLink" onClick={Auth.logout}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link className="navLink" as={Link} to="/signup">
                  Create an Account
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
