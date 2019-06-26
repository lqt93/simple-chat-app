import React from "react";
import request from "../../../utils/request";

const INITIAL_STATE = {
  email: "",
  password: "",
  loading: false,
  error: false
};

const withSigninHandler = SigninPage =>
  class SigninHandler extends React.PureComponent {
    _isMounted = false;
    state = {
      ...INITIAL_STATE
    };
    componentDidMount() {
      this._isMounted = true;
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
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
          await this.props.setAuthValue({ authUser: recUser, token: recToken });
          if (this._isMounted)
            this.setState({
              ...INITIAL_STATE
            });
          this.props.history.push("/");
        } else {
          if (this._isMounted)
            this.setState({
              loading: false,
              error: res.data.message
            });
        }
      } catch (err) {
        if (this._isMounted)
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
          {...this.props}
          handleChange={this.handleChange}
          submit={this.submit}
        />
      );
    }
  };

export default withSigninHandler;
