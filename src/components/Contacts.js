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
    searchTerm: "",
    letter: ""
  };

  componentDidMount() {
    this.setState({
      allClients: clients,
      filtered: clients,
      offset: 0,
      page: 1,
      pages: 19
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
      filtered: startsWithN,
      letter: n,
      pages: Math.ceil(startsWithN.length / 50),
      page: 1
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
      page: 1,
      searchTerm,
      filtered: filteredClients,
      pages: Math.ceil(filteredClients.length / 50)
    });
  };

  handlePagination = e => {
    const { allClients } = this.state;
    //Check if its a link
    if (e.target.tagName.toLowerCase() === "a") {
      /*  if (startsWithN) {
        this.setState({ filtered: startsWithN.slice(offset, 50) });
      } */
      this.setState({
        page: +e.target.innerText,
        filtered: allClients.slice(
          +e.target.innerText * 50,
          +e.target.innerText * 50 + 50
        ),
        offset: +e.target.innerText * 50
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
            <Link to={`/client/${filtered[i].id}`}>
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
          <Col md={10}>
            <Navbar bg="primary" fixed="bottom" style={{ zIndex: "1000" }}>
              <Pagination>
                {Array.apply(null, { length: pages }).map((el, index) => {
                  return (
                    <Pagination.Item
                      onClick={e => this.handlePagination(e)}
                      key={index + 1}
                      active={index + 1 === page}
                    >
                      {index + 1}
                    </Pagination.Item>
                  );
                })}
              </Pagination>
            </Navbar>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default Contacts;
