import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { Row, Col, Alert, Card, ListGroup, Pagination } from "react-bootstrap";
import Alphabet from "./Alphabet";
import clients from "../clients.json";

import React, { Component } from "react";

clients.sort((a, b) => a.name.localeCompare(b.name));

class Contacts extends Component {
  state = {
    allClients: clients,
    filtered: [],
    searchTerm: "",
    letter: ""
  };

  componentDidMount() {
    this.setState({
      allClients: clients,
      filtered: clients.slice(0, 50),
      offset: 50,
      pages: 20
    });
  }

  handleButtonClick = event => {
    const { allClients } = this.state;
    const letter = event.target.innerText;
    const startsWithN = allClients.filter(
      client => client.name.charAt(0) === letter
    );

    this.setState({
      filtered: [...startsWithN],
      letter
    });
  };

  handleInputChange = e => {
    console.log("Contacts search");
    const { allClients } = this.state;
    const searchTerm = e.target.value;
    const filteredClients = allClients.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    console.log(filteredClients.length);
    this.setState({
      searchTerm,
      filtered: [...filteredClients],
      pages: Math.ceil(filteredClients.length / 50)
    });
  };

  handlePagination = e => {
    console.log("Pagination CLick");
    const { filtered } = this.state;
    console.log(filtered);
  };
  /* 
  handlePageClick = e => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset }, () => {
      this.loadCommentsFromServer();
    });
  }; */

  render() {
    console.log("Rendered Contacts");
    console.log(this.state);
    const { filtered, searchTerm, letter, pages } = this.state;

    let items = [];
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item onClick={e => this.handlePagination(e)} key={number}>
          {number}
        </Pagination.Item>
      );
    }
    return (
      <Col sm={3} className="no-gutters padding-0 hidden-xs">
        <NavBar handleInputChange={this.handleInputChange} thisClient={null} />
        <Row>
          <Col md={4} className="no-gutters d-xs-none ">
            {items}
            <Alphabet
              letter={letter}
              handleButtonClick={this.handleButtonClick}
            />
          </Col>
          <Col md={8} className="no-gutters">
            {filtered.length === 0 ? (
              <Alert variant="danger" dismissible>
                <Alert.Heading>
                  No connections found by "{searchTerm}"
                </Alert.Heading>
                <p>Try something else?</p>
              </Alert>
            ) : null}
            <Card>
              {filtered.map((client, index) => {
                return (
                  <ListGroup key={index} variant="flush">
                    <Link params={{ testvalue: "hello" }} to={`/${client.id}`}>
                      <ListGroup.Item key={index}>{client.name}</ListGroup.Item>
                    </Link>
                  </ListGroup>
                );
              })}
            </Card>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default Contacts;
