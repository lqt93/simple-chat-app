import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateLayout from "../../components/layouts/Private";
import NotFound from "../../components/pages/NotFound";
import MessengerPage from "./components/Messenger";
// css
import "./Messenger.css";

const Messenger = props => {
  const thisPath = props.match.path;
  return (
    <PrivateLayout {...props}>
      <Switch>
        <Route
          path={thisPath}
          exact
          render={routeProps => <MessengerPage {...props} {...routeProps} />}
        />
        <Route
          path={`${thisPath}/new`}
          render={routeProps => <MessengerPage {...props} {...routeProps} />}
        />
        <Route
          path={`${thisPath}/t/:id`}
          render={routeProps => <MessengerPage {...props} {...routeProps} />}
        />
        <Route component={NotFound} />
      </Switch>
    </PrivateLayout>
  );
};

export default Messenger;
