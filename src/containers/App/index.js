import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../../components/templates/Layout";
import validateAuth from "../../utils/validateAuth";
import HomePage from "../HomeContainer";
import NotFoundPage from "../NotFoundContainer";
import SigninPage from "../SigninContainer";
import MessengerPage from "../MessengerContainer";

const INITIAL_STATE = {
  authUser: null,
  token: ""
};

class App extends React.Component {
  state = {
    ...INITIAL_STATE
  };
  componentDidMount() {}
  setAuthValue = (field, val) => {
    this.setState({ [field]: val });
  };
  signOut = () => {
    // sign out APIs
    // ....
    // clear localStorage
    localStorage.removeItem("authUser");
    localStorage.removeItem("token");
    // clear state
    this.setState({ ...INITIAL_STATE });
  };
  render() {
    const { authUser } = this.state;
    return (
      <Layout authUser={authUser} signOut={this.signOut}>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <HomePage authUser={authUser} />}
          />
          <Route
            path="/signin"
            render={props => (
              <SigninPage
                setAuthValue={this.setAuthValue}
                signOut={this.signOut}
              />
            )}
          />
          <Route
            path="/rooms/:id"
            render={props =>
              validateAuth(authUser)(<MessengerPage authUser={authUser} />)
            }
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
