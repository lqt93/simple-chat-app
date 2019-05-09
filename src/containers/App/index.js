import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../../components/Layout";
import HomePage from "../HomePage";
import NotFoundPage from "../NotFoundPage";

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
