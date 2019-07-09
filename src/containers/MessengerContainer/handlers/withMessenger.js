import React from "react";
import { throttle } from "throttle-debounce";
import request from "../../../utils/request";
import { socket, connectSocket, disconnectSocket } from "../../../utils/socket";

const INITIAL_STATE = {
  isOpenFindNameInput: false,
  msgTree: {},
  rooms: [],
  socketLoaded: false
};

const withMessengerHandler = Messenger =>
  class MessengerHandler extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE, windowHeight: null };
      this.delayedCallback = throttle(500, this.windowResize);
    }
    componentDidMount = async () => {
      // get window's height
      this.setWindowSize();
      window.addEventListener("resize", this.delayedCallback);
      // connect socket before getting rooms
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
    windowResize = () => {
      this.setWindowSize();
    };
    setWindowSize() {
      this.setState({
        windowHeight: window.innerHeight
      });
    }
    toggleNewConversation = () => {
      this.setState({
        isOpenFindNameInput: !this.state.isOpenFindNameInput
      });
    };
    setCurrentRoom = async () => {
      const roomId = this.props.match.params.id;
      const { pathname } = this.props.location;
      if (
        (pathname !== "/messenger" && !roomId) ||
        pathname === "/messenger/t" ||
        pathname === "/messenger/t/"
      ) {
        const { rooms } = this.state;
        return this.props.history.push(`/messenger/t/${rooms[0].room._id}`);
      }
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
        const { rooms } = this.state;
        if (pathname !== "/messenger")
          return this.props.history.push(`/messenger/t/${rooms[0].room._id}`);
      }
    };
    getPrivateRooms = () =>
      new Promise(async (resolve, reject) => {
        try {
          const res = await request({
            url: `/rooms/private`,
            method: "GET"
          });
          let { rooms } = res.data.value;
          rooms = rooms.map(item => {
            item.room.members = item.room.members.filter(
              member => member._id !== this.props.authUser._id
            );
            return item;
          });
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
      if (!this.state.socketLoaded) return null;
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
