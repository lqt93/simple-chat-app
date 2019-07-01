import React from "react";
import SignupPage from "./components/Signup";
import PublicLayout from "../../components/layouts/Public";
import withSignupHandler from "./handlers/withSignup";
// css
import "./Signup.css";

const Signup = props => {
  return (
    <PublicLayout authUser={props.authUser} signOut={props.signOut}>
      <SignupPage {...props} />
    </PublicLayout>
  );
};

export default withSignupHandler(Signup);
