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
    componentDidMount = () => {
      // this.getRoomBasicInfo();
      this.setCurrentRoom();
      this.getPrivateRooms();
      this.joinSocketRoom();
    };
    componentWillUnmount() {
      this.leaveSocketRoom();
    }
    componentWillReceiveProps(nextProps) {
      if (this.props.match.params.id !== nextProps.match.params.id) {
        const currentRoomId = nextProps.match.params.id;
        const participant = this.state.rooms.find(
          item => item.room._id === currentRoomId
        );
        this.setState({ currentRoomId, currentRoom: participant.room });
      }
    }
    toggleNewConversation = () => {
      this.setState({
        isOpenFindNameInput: !this.state.isOpenFindNameInput
      });
    };
    setCurrentRoom = () => {
      const roomId = this.props.match.params.id;
      this.setState({ currentRoomId: roomId });
    };
    getPrivateRooms = async () => {
      try {
        const res = await request({
          url: `/rooms/private`,
          method: "GET"
        });
        const { rooms } = res.data.value;
        const participant = rooms.find(
          item => item.room._id === this.state.currentRoomId
        );
        this.setState({ rooms, currentRoom: participant.room });
      } catch (error) {
        console.log("err", error);
      }
    };
    chooseCurrentRoom = roomId => () => {
      this.setState({ currentRoomId: roomId });
    };
    joinSocketRoom = async () => {
      const roomId = this.state.currentRoomId;
      if (!roomId) return;
      await connectSocket();
      socket.emit("join_room", roomId);
      this.setState({
        socketLoaded: true
      });
    };
    leaveSocketRoom = async () => {
      const roomId = this.state.currentRoomId;
      if (!roomId) return;
      socket.emit("leave_room", roomId);
      disconnectSocket();
    };
    async getRoomBasicInfo() {
      const roomId = this.state.currentRoomId;
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
          chooseCurrentRoom={this.chooseCurrentRoom}
        />
      );
    }
  };

export default withMessengerHandler;
