import React from "react";
import socket from "socket.io-client";
import { Switch, Route } from "react-router-dom";
import Layout from "../../components/templates/Layout";
import HomePage from "../HomeContainer";
import NotFoundPage from "../NotFoundContainer";
import SigninPage from "../SigninContainer";

const INITIAL_STATE = {
  user: null,
  token: ""
};

class App extends React.Component {
  state = {
    ...INITIAL_STATE
  };
  componentDidMount() {
    if (this.state.user) socket("http://localhost:8000");
  }
  setAuthValue = (field, val) => {
    this.setState({ [field]: val });
  };
  signOut = () => {
    // sign out APIs
    // ....
    // clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // clear state
    this.setState({ ...INITIAL_STATE });
  };
  render() {
    const { user } = this.state;
    return (
      <Layout authUser={user} signOut={this.signOut}>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <HomePage authUser={user} {...props} />}
          />
          <Route
            path="/signin"
            render={props => (
              <SigninPage
                setAuthValue={this.setAuthValue}
                signOut={this.signOut}
                {...props}
              />
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
