import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import clients from "../clients.json";
import NavBar from "./NavBar";
import { Col, Alert, Navbar, CardColumns, Card } from "react-bootstrap";

class ContactDetails extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      client: {},
      connections: [],
      filteredConnections: [],
      redirect: false
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
      client: thisClient,
      connections: connectionsOfClient,
      filteredConnections: [...connectionsOfClient]
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
      filteredConnections: connectionsOfClient
    });
  }

  render() {
    const { client, filteredConnections, searchTerm } = this.state;
    return (
      <Col md={true}>
        <NavBar
          handleInputChange={this.handleInputChange}
          thisClient={client}
        />
        <Navbar bg="light">
          <Navbar.Brand>
            <h4>Connections ({filteredConnections.length})</h4>
          </Navbar.Brand>
        </Navbar>
        {filteredConnections.length === 0 ? (
          <Alert variant="warning">
            No connections found by "{searchTerm}"<br />
            <br />
            Try something else?
          </Alert>
        ) : null}
        <CardColumns>
          {filteredConnections.map((connection, index) => {
            return (
              <Card key={index} className="text-center">
                <Link key={index} to={`/${connection.id}`}>
                  <img
                    src={connection.avatar}
                    width="100%"
                    height="auto"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
                  <Card.Body>
                    <Card.Title>{connection.name}</Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            );
          })}
        </CardColumns>
      </Col>
    );
  }
}

export default ContactDetails;
