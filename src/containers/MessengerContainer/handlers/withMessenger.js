import React from "react";
import request from "../../../utils/request";
import { socket, connectSocket, disconnectSocket } from "../../../utils/socket";

const INITIAL_STATE = {
  isOpenFindNameInput: false,
  msgTree: {},
  rooms: []
};

const withMessengerHandler = Messenger =>
  class MessengerHandler extends React.PureComponent {
    state = {
      ...INITIAL_STATE
    };
    componentDidMount = async () => {
      // connect socket firstly
      await this.handleSocket();

      await this.getPrivateRooms();
      this.setCurrentRoom();
    };
    componentWillUnmount() {
      // disconnect socket
      disconnectSocket();
    }
    componentWillReceiveProps(nextProps) {
      if (this.props.match.params.id !== nextProps.match.params.id) {
        const currentRoomId = this.props.match.params.id;
        const nextRoomId = nextProps.match.params.id;
        const participant = this.state.rooms.find(
          item => item.room._id === nextRoomId
        );
        socket.emit("leave_room", currentRoomId);
        socket.emit("join_room", nextRoomId);
        this.setState({
          currentRoomId: nextRoomId,
          currentRoom: (participant && participant.room) || {}
        });
      }
    }
    toggleNewConversation = () => {
      this.setState({
        isOpenFindNameInput: !this.state.isOpenFindNameInput
      });
    };
    setCurrentRoom = async () => {
      const roomId = this.props.match.params.id;
      if (!roomId) return this.props.history.push("/messenger");
      try {
        const res = await request({
          url: `/rooms/private/${roomId}`,
          method: "GET"
        });
        const foundRoom = res.data.value.room;
        if (!foundRoom) {
          return this.props.history.push("/messenger");
        }
        const targetId = foundRoom.room._id;
        socket.emit("join_room", targetId);
        this.setState({ currentRoomId: targetId, currentRoom: foundRoom.room });
      } catch (error) {
        console.log("err", error);
      }
    };
    getPrivateRooms = () =>
      new Promise(async (resolve, reject) => {
        try {
          const res = await request({
            url: `/rooms/private`,
            method: "GET"
          });
          const { rooms } = res.data.value;

          await this.setState({
            rooms
          });
          resolve();
        } catch (error) {
          console.log("err", error);
          reject(error);
        }
      });
    chooseCurrentRoom = roomId => () => {
      this.setState({ currentRoomId: roomId });
    };
    handleSocket = async () => {
      await connectSocket();
      // socket.emit("join_room", roomId);
      this.setState({
        socketLoaded: true
      });
    };
    updateMsgTree = (id, data) => {
      this.setState(prevState => {
        return {
          msgTree: {
            [id]: data
          }
        };
      });
    };
    render() {
      return (
        <Messenger
          {...this.state}
          {...this.props}
          toggleNewConversation={this.toggleNewConversation}
          chooseCurrentRoom={this.chooseCurrentRoom}
          updateMsgTree={this.updateMsgTree}
        />
      );
    }
  };

export default withMessengerHandler;
