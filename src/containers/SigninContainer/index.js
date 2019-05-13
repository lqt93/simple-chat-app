import React from "react";
import SigninPage from "../../components/pages/Signin";

class SigninContainer extends React.Component {
  state = {
    email: "",
    password: "",
    isSubmitting: false
  };
  handleChange = e => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submit = e => {
    e.preventDefault();
    console.log(e);
  };
  render() {
    console.log(">>> state", this.state);
    return (
      <SigninPage
        handleChange={this.handleChange}
        submit={this.submit}
        {...this.state}
      />
    );
  }
}

export default SigninContainer;
