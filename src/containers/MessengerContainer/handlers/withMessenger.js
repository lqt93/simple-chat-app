import React from "react";
import request from "../../../utils/request";
import { socket, connectSocket, disconnectSocket } from "../../../utils/socket";

const INITIAL_STATE = {
  roomInfo: {},
  loadingInfo: false
};

const withMessengerHandler = Messenger =>
  class MessengerHandler extends React.PureComponent {
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
      return <Messenger {...this.state} {...this.props} />;
    }
  };

export default withMessengerHandler;
