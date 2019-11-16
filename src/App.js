import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Loading from "./components/Loading";
import { Container, Row, Col } from "react-bootstrap";

import Contacts from "./components/Contacts";
import NotFound from "./components/NotFound";
import routes from "./routes/routes";
import ContactDetails from "./components/ContactDetails";

function App() {
  return (
    <Router>
      <Container fluid>
        <Switch>
          <Row>
            <Route path={routes.home} component={Contacts}></Route>
            <Route path={routes.id} exact component={ContactDetails}></Route>
            <Route component={NotFound}></Route>
          </Row>
        </Switch>
      </Container>
    </Router>
  );
}
export default App;
