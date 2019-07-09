import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
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
        <Route component={NotFoundMessenger} />
      </Switch>
    </PrivateLayout>
  );
};

const NotFoundMessenger = () => {
  return (
    <div>
      <Link to="/messenger">
        <Typography variant="h6"> 404. Not available </Typography>
        <Typography variant="body1"> Back to messenger </Typography>
      </Link>
    </div>
  );
};

export default Messenger;
