import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import { PersonPlus } from "react-bootstrap-icons";

import Auth from "../utils/auth";
import LocalsForm from "./LocalsForm";
import "../styles/Navbar.css";

const LocalsNavbar = () => {
  const [showModal, setShowModal] = useState(false);

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
                  <Nav.Link onClick={() => setShowModal(true)}>
                    <PersonPlus id="locals-icon" />
                  </Nav.Link>

                  <Modal
                    size="lg"
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    aria-labelledby="locals-modal"
                  >
                    <Tab.Container defaultActiveKey="add-profile">
                      <Modal.Header closeButton>
                        <Modal.Title id="locals-modal">
                          <p id="modal-title">
                            {" "}
                            &nbsp;&nbsp;Add a New Profile &nbsp;&nbsp;
                          </p>
                        </Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <Tab.Content>
                          <Tab.Pane eventKey="add-profile">
                            <LocalsForm
                              handleModalClose={() => setShowModal(false)}
                            />
                          </Tab.Pane>
                        </Tab.Content>
                      </Modal.Body>
                    </Tab.Container>
                  </Modal>
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

export default LocalsNavbar;
