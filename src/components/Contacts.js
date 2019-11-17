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
    const { allClients } = this.state;
    const searchTerm = e.target.value;
    const filteredClients = allClients.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    console.log(filteredClients.length);
    this.setState({
      offset: 50,
      page: 1,
      searchTerm,
      filtered: filteredClients,
      pages: Math.ceil(filteredClients.length / 50)
    });
  };

  handlePagination = e => {
    const { allClients, filtered, offset, pages, page } = this.state;
    if (e.target.tagName.toLowerCase() === "a") {
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

  next = e => {
    let { page } = this.state;
    console.log(page);
    page++;
    this.setState({
      page
    });
  };

  render() {
    let { filtered, searchTerm, letter, pages, page } = this.state;
    let renderedClients = [];
    if (!(filtered.length === 0)) {
      for (let i = 0; i < filtered.length; i++) {
        renderedClients.push(
          <ListGroup key={i} variant="flush">
            <Link to={`/${filtered[i].id}`}>
              <ListGroup.Item key={i}>{filtered[i].name}</ListGroup.Item>
            </Link>
          </ListGroup>
        );
      }
    }
    console.log(renderedClients);
    return (
      <Col sm={3} className="no-gutters padding-0 hidden-xs">
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
            ) : null}
            <Card>{renderedClients}</Card>
          </Col>
          <Navbar bg="primary">
            <Pagination>
              {/*  <Pagination.First />
            <Pagination.Prev /> */}
              {/*    {!(page === 1) ? <Pagination.Ellipsis /> : null} */}
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

              {/*           <Pagination.Ellipsis onClick={e => this.next(e)} /> */}
              {/*       <Pagination.Item onClick={e => this.handlePagination(e)}>
              {pages}
            </Pagination.Item> */}
              {/*      <Pagination.Next />
            <Pagination.Last /> */}
            </Pagination>
          </Navbar>
        </Row>
      </Col>
    );
  }
}
/* 
{
  filtered.forEach((filtered, index) => (
    <Pagination.Item onClick={e => this.handlePagination(e)} key={filtered}>
      {index}
    </Pagination.Item>
  ));
} */

export default Contacts;
