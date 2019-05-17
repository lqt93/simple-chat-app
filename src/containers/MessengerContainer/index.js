import React from "react";
import { withRouter } from "react-router-dom";
import ChatBoxContainer from "./ChatBoxContainer";
import request from "../../utils/request";
import socket from "../../utils/socket";

const INITIAL_STATE = {
  roomInfo: null,
  loadingInfo: false
};

class MessengerContainer extends React.Component {
  state = {
    ...INITIAL_STATE
  };
  async componentDidMount() {
    await this.getRoomBasicInfo();
    const id = this.state.roomInfo._id;
    socket.emit("join_room", id);
    socket.on("room_msg", function(a) {
      console.log("received msg:", a);
    });
  }
  async getRoomBasicInfo() {
    const roomId = this.props.match.params.id;
    this.setState({
      loadingInfo: true
    });
    try {
      const res = await request({
        url: `/rooms/${roomId}`,
        method: "GET"
      });
      if (res.data.status === "success") {
        this.setState({
          loadingInfo: false,
          roomInfo: res.data.value.room
        });
      } else {
        this.setState({
          loadingInfo: false,
          error: res.data.message
        });
      }
    } catch (err) {
      this.setState({
        loadingInfo: false,
        error: err
      });
      console.log("err", err);
    }
  }

  render() {
    const { roomInfo } = this.state;
    if (!roomInfo) return <div />;
    return <ChatBoxContainer roomInfo={roomInfo} {...this.props} />;
  }
}

export default withRouter(MessengerContainer);
