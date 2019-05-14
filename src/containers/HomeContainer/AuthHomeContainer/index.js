import React from "react";
import request from "../../../utils/request";
import AuthHomePage from "../../../components/pages/Home/AuthHome";

const INITIAL_STATE = {
  publicRooms: [],
  loading: false,
  error: false
};

class AuthHomeContainer extends React.Component {
  state = {
    ...INITIAL_STATE
  };
  componentWillMount() {
    this.getPublicRooms();
  }
  async getPublicRooms() {
    this.setState({
      loading: true
    });

    try {
      const res = await request({
        url: "/rooms/public",
        method: "GET"
      });

      if (res.data.status === "success") {
        this.setState({
          publicRooms: res.data.value.rooms,
          loading: false,
          error: false
        });
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
  }
  render() {
    return <AuthHomePage {...this.props} {...this.state} />;
  }
}

export default AuthHomeContainer;
