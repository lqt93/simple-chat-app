import React from "react";
import request from "../../../utils/request";
import { socket, connectSocket, disconnectSocket } from "../../../utils/socket";

const INITIAL_STATE = {
  roomInfo: {},
  loadingInfo: false,
  isOpenFindNameInput: false
};

const withMessengerHandler = Messenger =>
  class MessengerHandler extends React.PureComponent {
    state = {
      ...INITIAL_STATE
    };
    componentDidMount() {
      // document.body.style.overflow = "hidden !important";
      this.getRoomBasicInfo();
      this.joinSocketRoom();
    }
    componentWillUnmount() {
      this.leaveSocketRoom();
    }
    toggleNewConversation = () => {
      this.setState({
        isOpenFindNameInput: !this.state.isOpenFindNameInput
      });
    };
    joinSocketRoom = async () => {
      const roomId = this.props.match.params.id;
      if (!roomId) return;
      await connectSocket();
      socket.emit("join_room", roomId);
      this.setState({
        socketLoaded: true
      });
    };
    leaveSocketRoom = async () => {
      const roomId = this.props.match.params.id;
      if (!roomId) return;
      socket.emit("leave_room", roomId);
      disconnectSocket();
    };
    async getRoomBasicInfo() {
      const roomId = this.props.match.params.id;
      if (!roomId) return;
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
      return (
        <Messenger
          {...this.state}
          {...this.props}
          toggleNewConversation={this.toggleNewConversation}
        />
      );
    }
  };

export default withMessengerHandler;
