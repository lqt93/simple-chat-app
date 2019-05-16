import React from "react";
import { Redirect } from "react-router";

function validateAuth(authUser) {
  return function(Component) {
    if (authUser) {
      return Component;
    } else {
      return <Redirect to="/signin" />;
    }
  };
}

export default validateAuth;
