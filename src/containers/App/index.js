import React from "react";
import { Switch, Route } from "react-router-dom";
import request from "../../utils/request";
import Layout from "../../components/templates/Layout";
import validateAuth from "../../utils/validateAuth";
import HomePage from "../HomeContainer";
import NotFoundPage from "../NotFoundContainer";
import SigninPage from "../SigninContainer";
import SignupPage from "../SignupContainer";
import MessengerPage from "../MessengerContainer";
import SettingsPage from "../SettingContainer";
// css
import "./App.css";

const INITIAL_STATE = {
  authUser: null,
  token: ""
};

class App extends React.Component {
  state = {
    ...INITIAL_STATE,
    isValidated: false
  };
  componentDidMount() {
    if (!this.state.isValidated) {
      this.validateCurrentUser();
    }
  }
  setAuthValue = (field, val) => {
    if (field === "authUser" || field === "token") {
      localStorage.setItem(
        field,
        field === "authUser" ? JSON.stringify(val) : val
      );
    }
    this.setState({ [field]: val });
  };
  async validateCurrentUser() {
    try {
      const res = await request({
        url: "/users/current",
        method: "GET"
      });
      if (res.data.status === "success" && res.data.value) {
        const authUser = JSON.parse(localStorage.getItem("authUser"));
        const token = localStorage.getItem("token");
        this.setState({
          authUser: authUser,
          token: token,
          isValidated: true
        });
      } else {
        this.setState({
          ...INITIAL_STATE,
          isValidated: true
        });
      }
    } catch (err) {
      console.log("err validating user", err);
      this.setState({ ...INITIAL_STATE, isValidated: true });
    }
  }
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
    const { authUser, isValidated } = this.state;
    if (!isValidated) return null;
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
            path="/settings"
            render={props =>
              validateAuth(authUser)(
                <SettingsPage
                  {...props}
                  authUser={authUser}
                  setAuthValue={this.setAuthValue}
                />
              )
            }
          />
          <Route
            path="/messages/:id"
            render={props =>
              validateAuth(authUser)(<MessengerPage authUser={authUser} />)
            }
          />
          <Route path="/signup" render={props => <SignupPage {...props} />} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
