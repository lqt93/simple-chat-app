import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateLayout from "../../components/layouts/Private";
import NotFound from "../../components/pages/NotFound";
import MessengerPage from "./components/Messenger";
// css
import "./Messenger.css";

const Messenger = ({
  setAuthValue,
  token,
  signOut,
  location,
  match,
  history,
  ...rest
}) => {
  const thisPath = match.path;
  return (
    <PrivateLayout signOut={signOut} history={history} {...rest}>
      <Switch>
        <Route
          path={thisPath}
          exact
          render={routeProps => <MessengerPage {...rest} {...routeProps} />}
        />
        <Route
          path={`${thisPath}/new`}
          render={routeProps => <MessengerPage {...rest} {...routeProps} />}
        />
        <Route
          path={`${thisPath}/t/:id`}
          render={routeProps => <MessengerPage {...rest} {...routeProps} />}
        />
        <Route
          path={`${thisPath}/t`}
          render={routeProps => <MessengerPage {...rest} {...routeProps} />}
        />
        <Route component={NotFound} />
      </Switch>
    </PrivateLayout>
  );
};

export default Messenger;
