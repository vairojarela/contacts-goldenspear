import React from "react";
import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Contacts from "./components/Contacts";
import ContactDetails from "./components/ContactDetails";

function App() {
  return (
    <HashRouter basename="/">
      <Container>
        <Switch>
          <Row>
            <Route path={"/"} component={Contacts}></Route>

            <Route path={"/:id"} exact component={ContactDetails}></Route>
          </Row>
        </Switch>
      </Container>
    </HashRouter>
  );
}
export default App;
