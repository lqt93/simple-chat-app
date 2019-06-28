import React from "react";
import SigninPage from "./components/Signin";
import PublicLayout from "../../components/layouts/Public";
import withSigninHandler from "./handlers/withSignin";
// css
import "./Signin.css";

const Signin = props => {
  return (
    <PublicLayout authUser={props.authUser} signOut={props.signOut}>
      <SigninPage {...props} />
    </PublicLayout>
  );
};

export default withSigninHandler(Signin);
