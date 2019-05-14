import React from "react";
import AuthHomePage from "../../../components/pages/Home/AuthHome";

class AuthHomeContainer extends React.Component {
  render() {
    return <AuthHomePage {...this.props} />;
  }
}

export default AuthHomeContainer;
