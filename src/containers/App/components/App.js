import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../../../components/templates/Layout";
import validateAuth from "../../../utils/validateAuth";
import HomePage from "../../HomeContainer";
import NotFoundPage from "../../NotFoundContainer";
import SigninPage from "../../SigninContainer";
import SignupPage from "../../SignupContainer";
import MessengerPage from "../../MessengerContainer";
import SettingsPage from "../../SettingContainer";

const App = ({ isValidated, signOut, ...rest }) => {
  if (!isValidated) return null;
  const { authUser } = rest;
  return (
    <Layout authUser={authUser} signOut={signOut}>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <HomePage {...rest} {...props} />}
        />
        <Route
          path="/signin"
          render={props =>
            validateAuth(!!authUser, false)(<SigninPage {...rest} {...props} />)
          }
        />
        <Route
          path="/signup"
          render={props =>
            validateAuth(!!authUser, false)(<SignupPage {...props} />)
          }
        />
        <Route
          path="/settings"
          render={props =>
            validateAuth(!!authUser, true)(
              <SettingsPage {...rest} {...props} />
            )
          }
        />
        <Route
          path="/messages/:id"
          render={props =>
            validateAuth(!!authUser, true)(
              <MessengerPage {...rest} {...props} />
            )
          }
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
};

export default App;
