import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import clients from "../clients.json";
import NavBar from "./NavBar";
import {
  Col,
  Alert,
  Navbar,
  Row,
  Card,
  Container,
  Pagination,
  Form
} from "react-bootstrap";

class ContactDetails extends Component {
  constructor() {
    super();
    this.state = {
      allClients: clients,
      searchTerm: "",
      client: {},
      connections: [],
      filteredConnections: [],
      redirect: false,
      pages: 19,
      page: 0
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/error404" />;
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    let thisClient = clients.find(client => client.id === +id);
    if (!thisClient) return this.setRedirect();
    const connectionsOfClient = clients.filter(client => {
      if (thisClient.connections.includes(client.id)) return client;
    });
    this.setState({
      pages: Math.ceil(connectionsOfClient.length / 50),
      client: thisClient,
      connections: connectionsOfClient,
      filteredConnections: [...connectionsOfClient].slice(0, 50)
    });
  }

  handleInputChange = event => {
    const { connections } = this.state;
    const searchTerm = event.target.value;
    const filter = connections.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    this.setState({
      searchTerm,
      filteredConnections: filter
    });
  };

  componentWillReceiveProps(props) {
    const { id } = props.match.params;
    // const { connections } = this.state;
    let thisClient = clients.find(client => client.id === +id);
    const connectionsOfClient = clients.filter(client => {
      if (thisClient.connections.includes(client.id)) return client;
    });
    this.setState({
      client: thisClient,
      connections: connectionsOfClient,
      filteredConnections: [...connectionsOfClient].slice(0, 50)
    });
  }

  handlePagination = e => {
    const { connections } = this.state;
    //Check if its a link

    if (e.target.tagName.toLowerCase() === "a") {
      this.setState({
        page: +e.target.innerText,
        filteredConnections: connections.slice(
          +e.target.innerText * 50,
          +e.target.innerText * 50 + 50
        ),
        offset: +e.target.innerText * 50
      });
    }
  };

  render() {
    const { client, filteredConnections, searchTerm, connections } = this.state;
    let { pages, page } = this.state;

    return (
      <Col md={true}>
        <NavBar
          handleInputChange={this.handleInputChange}
          thisClient={client}
        />
        <Navbar bg="light">
          <Navbar.Brand>
            <h4>
              Connections ({filteredConnections.length} of {connections.length})
            </h4>
          </Navbar.Brand>
        </Navbar>
        {filteredConnections.length === 0 ? (
          <Alert variant="warning">
            No connections found by "{searchTerm}"<br />
            <br />
            Try something else?
          </Alert>
        ) : null}
        <Container>
          <Row style={{ justifyContent: "space-evenly" }}>
            {filteredConnections.map((connection, index) => {
              return (
                <Card
                  style={{ width: "25%" }}
                  key={index}
                  className="text-center"
                >
                  <Link key={index} to={`/${connection.id}`}>
                    <img
                      src={connection.avatar}
                      width="100%"
                      height="auto"
                      className="d-inline-block align-top"
                      alt={connection.name}
                    />
                    <Card.Body>
                      <Card.Title>{connection.name}</Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
              );
            })}
          </Row>
        </Container>
        <Navbar
          bg="dark"
          sticky="bottom"
          style={{
            position: "fixed",
            bottom: "0",
            width: "10%",
            right: "10%",
            zIndex: "10000"
          }}
        >
          <Form inline></Form>
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

export default ContactDetails;
