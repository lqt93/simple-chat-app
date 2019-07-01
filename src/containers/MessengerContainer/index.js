import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateLayout from "../../components/layouts/Private";
import MessengerPage from "./components/Messenger";
import withMessengerHandler from "./handlers/withMessenger";
// css
import "./Messenger.css";

const Messenger = props => {
  const thisPath = props.match.path;
  return (
    <PrivateLayout {...props}>
      <Switch>
        <Route
          path="/"
          render={routeProps => <MessengerPage {...props} {...routeProps} />}
        />
        <Route
          path={`${thisPath}/:id`}
          render={routeProps => <MessengerPage {...props} {...routeProps} />}
        />
      </Switch>
    </PrivateLayout>
  );
};

export default withMessengerHandler(Messenger);
