import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import Contacts from "./components/Contacts";
import ContactDetails from "./components/ContactDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <Contacts />
          <Switch>
            <Route path="/:id" exact component={ContactDetails}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;
