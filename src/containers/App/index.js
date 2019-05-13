import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../../components/templates/Layout";
import HomePage from "../HomeContainer";
import NotFoundPage from "../NotFoundContainer";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}

export default App;
