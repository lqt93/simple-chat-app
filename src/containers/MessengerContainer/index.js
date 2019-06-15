import React from "react";
import { withRouter } from "react-router-dom";
import ChatBoxContainer from "./ChatBoxContainer";
import request from "../../utils/request";
import { socket, connectSocket, disconnectSocket } from "../../utils/socket";
// css
import "./Messenger.css";

const INITIAL_STATE = {
  roomInfo: null,
  loadingInfo: false
};

class MessengerContainer extends React.PureComponent {
  state = {
    ...INITIAL_STATE
  };
  async componentDidMount() {
    await this.getRoomBasicInfo();
    const roomId = this.props.match.params.id;
    await connectSocket();
    socket.emit("join_room", roomId);
    this.setState({
      socketLoaded: true
    });
  }
  componentWillUnmount() {
    const roomId = this.props.match.params.id;
    socket.emit("leave_room", roomId);
    disconnectSocket();
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
    const { authUser } = this.props;
    const { roomInfo } = this.state;
    if (!roomInfo) return <div />;
    return (
      <ChatBoxContainer {...this.state} {...this.props} authUser={authUser} />
    );
  }
}

export default withRouter(MessengerContainer);
