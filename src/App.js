import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Contacts from "./components/Contacts";
import ContactDetails from "./components/ContactDetails";

function App() {
  console.log(process.env.PUBLIC_URL);
  return (
    <Router>
      <Container>
        <Switch>
          <Row>
            <Route path={"/contacts-goldenspear"} component={Contacts}></Route>

            <Route
              path={"/contacts-goldenspear/:id"}
              component={ContactDetails}
            ></Route>
          </Row>
        </Switch>
      </Container>
    </Router>
  );
}
export default App;
