import React from "react";
import { Redirect } from "react-router";

function validateAuth(isLoggedIn, isPrivate) {
  return function(Component) {
    if (isPrivate) {
      if (isLoggedIn) {
        return Component;
      } else {
        return <Redirect to="/signin" />;
      }
    } else {
      if (!isLoggedIn) {
        return Component;
      } else {
        return <Redirect to="/" />;
      }
    }
  };
}

export default validateAuth;
