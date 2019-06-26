import React from "react";
import request from "../../../utils/request";

const INITIAL_STATE = {
  authUser: null,
  token: ""
};

const allowedAuthFields = ["authUser", "token"];

const withAppHandler = App =>
  class AppHandler extends React.PureComponent {
    state = {
      ...INITIAL_STATE,
      isValidated: false
    };
    componentDidMount() {
      if (!this.state.isValidated) {
        this.validateCurrentUser();
      }
    }
    setAuthValue = newObj => {
      for (let key in newObj) {
        if (allowedAuthFields.indexOf(key) < 0) delete newObj[key];
        if (key === "authUser" || key === "token") {
          localStorage.setItem(
            key,
            key === "authUser" ? JSON.stringify(newObj[key]) : newObj[key]
          );
        }
      }
      if (Object.keys(newObj).length <= 0) return;
      this.setState(newObj);
    };
    validateCurrentUser = async () => {
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const token = localStorage.getItem("token");
      if (!authUser || !token)
        return this.setState({
          ...INITIAL_STATE,
          isValidated: true
        });
      try {
        const res = await request({
          url: "/users/current",
          method: "GET"
        });
        if (res.data.status === "success" && res.data.value) {
          this.setState({
            authUser: authUser,
            token: token,
            isValidated: true
          });
        } else {
          this.setState({
            ...INITIAL_STATE,
            isValidated: true
          });
        }
      } catch (err) {
        console.log("err validating user", err);
        this.setState({ ...INITIAL_STATE, isValidated: true });
      }
    };
    signOut = () => {
      // sign out APIs
      // ....
      // clear localStorage
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
      // clear state
      this.setState({ ...INITIAL_STATE });
    };
    render() {
      return (
        <App
          {...this.props}
          {...this.state}
          setAuthValue={this.setAuthValue}
          signOut={this.signOut}
        />
      );
    }
  };

export default withAppHandler;
