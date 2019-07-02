import React from "react";
import { Switch, Route } from "react-router-dom";
import validateAuth from "../../../utils/validateAuth";
import HomeRoute from "../../HomeContainer";
import NotFoundRoute from "../../NotFoundContainer";
import SigninRoute from "../../SigninContainer";
import SignupRoute from "../../SignupContainer";
import MessengerRoute from "../../MessengerContainer";
import AccountRoute from "../../AccountContainer";
import CommunityRoute from "../../CommunityContainer";
import FriendRoute from "../../FriendContainer";

const App = ({ isValidated, ...rest }) => {
  if (!isValidated) return null;
  const { authUser } = rest;
  return (
    <React.Fragment>
      <Switch>
        {/* home */}
        <Route
          exact
          path="/"
          render={props => <HomeRoute {...rest} {...props} />}
        />
        {/* public routes */}
        <Route
          path="/signin"
          render={props =>
            validateAuth(!!authUser, false)(
              <SigninRoute {...rest} {...props} />
            )
          }
        />
        <Route
          path="/signup"
          render={props =>
            validateAuth(!!authUser, false)(<SignupRoute {...props} />)
          }
        />
        {/* private routes */}
        <Route
          path="/account"
          render={props =>
            validateAuth(!!authUser, true)(
              <AccountRoute {...rest} {...props} />
            )
          }
        />
        <Route
          path="/messenger"
          render={props =>
            validateAuth(!!authUser, true)(
              <MessengerRoute {...rest} {...props} />
            )
          }
        />
        <Route
          path="/friends"
          render={props =>
            validateAuth(!!authUser, true)(<FriendRoute {...rest} {...props} />)
          }
        />
        <Route
          path="/communities"
          render={props =>
            validateAuth(!!authUser, true)(
              <CommunityRoute {...rest} {...props} />
            )
          }
        />
        {/* Not found */}
        <Route component={NotFoundRoute} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
