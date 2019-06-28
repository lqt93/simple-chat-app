import React from "react";
import AuthHomePage from "./components/AuthHome";
import PrivateLayout from "../../../components/layouts/Private";
import withAuthHomeHandler from "./handlers/withAuthHome";

const AuthHome = props => {
  return (
    <PrivateLayout {...props}>
      <AuthHomePage {...props} />
    </PrivateLayout>
  );
};

export default withAuthHomeHandler(AuthHome);
