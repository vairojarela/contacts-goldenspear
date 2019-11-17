import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Container, Row } from "react-bootstrap";

import Contacts from "./components/Contacts";
import routes from "./routes/routes";
import ContactDetails from "./components/ContactDetails";

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Row>
            <Route path={routes.home} component={Contacts}></Route>
            <Route path={routes.id} component={ContactDetails}></Route>
          </Row>
        </Switch>
      </Container>
    </Router>
  );
}
export default App;
