import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
// import background from '/download.png';
import Auth from "../utils/auth";
import "../styles/SignupForm.css";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    firstname: "",
    lastname: "",
    zipcode: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      firstname: "",
      lastname: "",
      zipcode: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Container style={{ zIndex: 1 }} fluid>
        <div className="background-img">
          <img id="profPic" src="/ha_img3.png" alt="prof-pic" />
        </div>
      </Container>
      {/* This is needed for the validation functionality above */}
      <Container style={{ zIndex: 100 }} id="big-form">
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {/* show alert if server response is bad */}
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            Something went wrong with your signup!
          </Alert>

          <div className="signupForms">
            <Form.Group>
              <Form.Label htmlFor="firstname" id="formLabel">
                First Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Your firstname"
                name="firstname"
                onChange={handleInputChange}
                value={userFormData.firstname}
                required
              />
              <Form.Control.Feedback type="invalid">
                First name is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="lastname" id="formLabel">
                Last Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Your lastname"
                name="lastname"
                onChange={handleInputChange}
                value={userFormData.lastname}
                required
              />
              <Form.Control.Feedback type="invalid">
                Last name is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="zipcode" id="formLabel">
                Zipcode
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Your zipcode"
                name="zipcode"
                onChange={handleInputChange}
                value={userFormData.zipcode}
                required
              />
              <Form.Control.Feedback type="invalid">
                Zipcode is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="email" id="formLabel">
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email address"
                name="email"
                onChange={handleInputChange}
                value={userFormData.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                Email is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password" id="formLabel">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Your password"
                name="password"
                onChange={handleInputChange}
                value={userFormData.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password is required!
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="signupButton">
            <Button
              disabled={
                !(
                  userFormData.firstname &&
                  userFormData.lastname &&
                  userFormData.zipcode &&
                  userFormData.email &&
                  userFormData.password
                )
              }
              type="submit"
              variant="success"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default SignupForm;
