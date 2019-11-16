import React from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";

const NavBar = ({ thisClient, handleInputChange }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {thisClient ? (
          <>
            <Nav className="mr-auto">
              <Navbar.Brand>
                <img
                  src={thisClient.avatar}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt={thisClient.name}
                />
              </Navbar.Brand>
              <Navbar.Brand>{thisClient.name}</Navbar.Brand>
            </Nav>
          </>
        ) : null}
        <Form inline>
          <FormControl
            name="search"
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={handleInputChange}
          />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
