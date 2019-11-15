import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import "./App.css";
import Loading from "./components/Loading";
import clients from "./clients.json";
const Contacts = lazy(() => import("./components/Contacts"));
const ContactDetails = lazy(() => import("./components/ContactDetails"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <div className="container">
          <div className="row">
            <Contacts clients={clients} />
            <Switch>
              <Route
                path="/:id"
                render={props => (
                  <ContactDetails {...props} clients={clients} />
                )}
              />
            </Switch>
          </div>
        </div>
      </Suspense>
    </Router>
  );
}
export default App;
