import React, { Fragment } from "react";
import { Switch } from "react-router-dom";
import Info from "../routes/Info";
import Works from "../routes/Works";
import Novoroll from "../routes/Works/Novoroll";
import Links from "../routes/Links";
import NoMatch from "../routes/NoMatch";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";

export default function App() {
  return (
    <Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Info />
          </Route>
          <Route exact path="/works/novoroll">
            <Novoroll />
          </Route>
          <Route path="/works">
            <Works />
          </Route>
          <Route exact path="/links">
            <Links />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </Fragment>
  );
}
