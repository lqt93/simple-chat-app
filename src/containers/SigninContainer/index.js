import React from "react";
import { withRouter } from "react-router-dom";
import SigninPage from "../../components/pages/Signin";
import request from "../../utils/request";

class SigninContainer extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false,
    error: false
  };
  handleChange = e => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submit = async e => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: false
    });
    const { email, password } = this.state;
    try {
      const res = await request({
        url: "/users/auth",
        method: "POST",
        data: {
          email,
          password
        }
      });
      if (res.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        localStorage.setItem("token", res.data.data.token);
        this.setState(
          {
            loading: false
          },
          () => {
            this.props.history.push("/");
          }
        );
      } else {
        this.setState({
          loading: false,
          error: res.data.message
        });
      }
    } catch (err) {
      this.setState({
        loading: false,
        error: err
      });
      console.log("err", err);
    }
  };
  render() {
    return (
      <SigninPage
        handleChange={this.handleChange}
        submit={this.submit}
        {...this.state}
      />
    );
  }
}

export default withRouter(SigninContainer);
