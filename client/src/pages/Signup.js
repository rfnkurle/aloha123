import React from "react";
import { Container, CardColumns } from "react-bootstrap";
import Navbar from "../components/Navbar";

import SignupForm from "../components/SignupForm";
import "../styles/SignupForm.css";

const Signup = () => {
  return (
    <>
      <Navbar />
      <Container fluid id="elusive-container">
        <SignupForm></SignupForm>
        <CardColumns></CardColumns>
      </Container>
    </>
  );
};

export default Signup;
