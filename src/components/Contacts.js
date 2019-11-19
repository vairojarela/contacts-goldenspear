import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import {
  Row,
  Col,
  Alert,
  Card,
  ListGroup,
  Pagination,
  Navbar
} from "react-bootstrap";
import Alphabet from "./Alphabet";
import clients from "../clients.json";

import React, { Component } from "react";

clients.sort((a, b) => a.name.localeCompare(b.name));

class Contacts extends Component {
  state = {
    allClients: [],
    filtered: [],
    searchTerm: null,
    letter: ""
  };

  componentDidMount() {
    this.setState({
      allClients: clients,
      filtered: clients,
      offset: 0,
      page: 0,
      pages: 20
    });
  }

  handleButtonClick = event => {
    let { allClients, letter } = this.state;
    if (event.target.innerText === "#")
      return this.setState({ filtered: allClients, letter: "#", pages: 20 });
    else letter = event.target.innerText;
    const n = event.target.innerText;

    const startsWithN = allClients.filter(
      client => client.name.charAt(0) === letter
    );
    console.log(startsWithN);
    this.setState({
      searchTerm: letter,
      filtered: startsWithN,
      letter: n,
      offset: 50,
      pages: Math.ceil(startsWithN.length / 50),
      page: 0
    });
  };

  handleInputChange = e => {
    const { allClients } = this.state;
    const searchTerm = e.target.value;
    const filteredClients = allClients.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    this.setState({
      startsWithN: null,
      offset: 50,
      page: 0,
      searchTerm,
      filtered: filteredClients,
      pages: Math.ceil(filteredClients.length / 50)
    });
  };

  handlePagination = e => {
    const { allClients, searchTerm, letter } = this.state;
    //Check if its a link
    let clicked = +e.target.innerText;
    console.log(clicked);
    if (e.target.innerText === "#") {
      return this.setState({
        filtered: allClients
      });
    }
    if (searchTerm) {
      const startsWithN = allClients.filter(
        client => client.name.charAt(0) === letter
      );
      console.log(startsWithN);
      return this.setState({
        filtered: startsWithN.slice(clicked * 50, clicked * 50 + 50),
        page: clicked
      });
    }
    if (e.target.tagName.toLowerCase() === "a") {
      return this.setState({
        filtered: allClients.slice(clicked * 50, clicked * 50 + 50),
        offset: clicked * 50,
        page: clicked
      });
    }
  };

  render() {
    let { filtered, searchTerm, letter, pages, page, startsWithN } = this.state;
    let renderedClients = [];
    if (!(filtered.length === 0 && startsWithN)) {
      for (let i = 0; i < 50 && i < filtered.length; i++) {
        renderedClients.push(
          <ListGroup key={i} variant="flush">
            <Link to={`/${filtered[i].id}`}>
              <ListGroup.Item key={i}>{filtered[i].name}</ListGroup.Item>
            </Link>
          </ListGroup>
        );
      }
    }
    return (
      <Col sm={3} className="no-gutters padding-0 d-none d-md-block">
        <NavBar handleInputChange={this.handleInputChange} thisClient={null} />
        <Row>
          <Col md={2} className="no-gutters d-xs-none ">
            <Alphabet
              letter={letter}
              handleButtonClick={this.handleButtonClick}
            />
          </Col>
          <Col md={10} className="no-gutters">
            {filtered.length === 0 ? (
              <Alert variant="danger" dismissible>
                <Alert.Heading>
                  No connections found by "{searchTerm}"
                </Alert.Heading>
                <p>Try something else?</p>
              </Alert>
            ) : (
              <Card>{renderedClients}</Card>
            )}
          </Col>
        </Row>
        <Navbar
          style={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            zIndex: "1000"
          }}
          bg="dark"
          sticky="bottom"
        >
          <Pagination size="sm">
            {Array.apply(null, { length: pages }).map((el, index) => {
              return (
                <Pagination.Item
                  onClick={e => this.handlePagination(e)}
                  key={index}
                  active={index === page}
                >
                  {index}
                </Pagination.Item>
              );
            })}
          </Pagination>
        </Navbar>
      </Col>
    );
  }
}

export default Contacts;
