import React from "react";
import { withRouter } from "react-router-dom";
import SigninPage from "../../components/pages/Signin";
import request from "../../utils/request";
// css
import "./Signin.css";

const INITIAL_STATE = {
  email: "",
  password: "",
  loading: false,
  error: false
};

class SigninContainer extends React.Component {
  state = {
    ...INITIAL_STATE
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
        const recUser = res.data.value.user || null;
        const recToken = res.data.value.token || null;
        await this.props.setAuthValue("authUser", recUser);
        await this.props.setAuthValue("token", recToken);
        await this.setState({
          ...INITIAL_STATE
        });
        this.props.history.push("/");
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
