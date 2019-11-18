import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Contacts from "./components/Contacts";
import ContactDetails from "./components/ContactDetails";

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Row>
            <Route path={"/"} component={Contacts}></Route>

            <Route path={"/:id"} component={ContactDetails}></Route>
          </Row>
        </Switch>
      </Container>
    </Router>
  );
}
export default App;
