import React from "react";
import SignupForm from "./SignupForm";

function SignupPage(props) {
  return (
    <div className="signup-container">
      <SignupForm {...props} />
    </div>
  );
}

export default SignupPage;
