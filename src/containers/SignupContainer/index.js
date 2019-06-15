import React from "react";
// components
import SignupPage from "../../components/pages/Signup";
// utils
import request from "../../utils/request";
// css
import "./Signup.css";

const INITIAL_STATE = {
  isSubmitting: false,
  error: false,
  success: false
};

const requiredFields = {
  username: "Username",
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  password: "Password",
  retypePassword: "Re-type password"
};

class SignupContainer extends React.PureComponent {
  state = {
    ...INITIAL_STATE
  };
  submitNewUser = async e => {
    e.preventDefault();
    // if request is sent, stop submitting
    if (this.state.isSubmitting) return;

    // if any field is empty, show error
    for (let field in requiredFields) {
      if (field !== "retypePassword" && !e.target[field].value.trim())
        return this.setErrorMsg(
          `Please fill out ${requiredFields[field]} field`
        );
    }

    const password = e.target.password.value.trim();
    // if password is not > 6, show error
    if (password.length < 6)
      return this.setErrorMsg("Password should be longer than 6 characters");

    const retypePassword = e.target.retypePassword.value.trim();
    // if re-type is not filled, show error
    if (!retypePassword)
      return this.setErrorMsg(
        `Please fill out ${requiredFields["retypePassword"]}`
      );

    // if re-type does not match, show error
    if (password !== retypePassword)
      return this.setErrorMsg("Re-type password does not match password");

    const submitObj = {};
    for (let field in requiredFields) {
      if (field !== "retypePassword")
        submitObj[field] = e.target[field].value.trim();
    }

    // start submitting new-user's data
    this.setState({ isSubmitting: true });
    try {
      const res = await request({
        url: "/users/reg",
        method: "POST",
        data: submitObj
      });
      if (res.status === 200 && res.data.status === "success") {
        this.setSuccessMsg("User is created");
        setTimeout(this.redirectAfterSuccess, 1000);
      }
    } catch (error) {
      this.setErrorMsg(error.response.data.message || "Error");
    }
  };
  setErrorMsg(value) {
    if (typeof value !== "string") return;
    this.setState({ error: value, isSubmitting: false });
  }
  setSuccessMsg(value) {
    this.setState({ success: value, isSubmitting: false, error: false });
  }
  redirectAfterSuccess = () => {
    this.setState({ ...INITIAL_STATE });
    this.props.history.push("/signin");
  };
  render() {
    return <SignupPage submitNewUser={this.submitNewUser} {...this.state} />;
  }
}

export default SignupContainer;
