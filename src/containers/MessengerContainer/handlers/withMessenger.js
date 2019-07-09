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
      this._isMounted = false;
      this.delayedCallback = throttle(500, this.windowResize);
    }
    componentDidMount = async () => {
      this._isMounted = true;
      // get window's height
      this.setWindowSize();
      window.addEventListener("resize", this.delayedCallback);
      // connect socket before getting rooms
      await this.handleSocket();

      await this.getPrivateRooms();
      this.analyzeRoutes();
    };
    componentWillUnmount() {
      this._isMounted = false;
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
        this.setMountedState({
          currentRoomId: nextRoomId,
          currentRoom: (participant && participant.room) || {}
        });
      }
    }
    windowResize = () => {
      this.setWindowSize();
    };
    setWindowSize() {
      this.setMountedState({
        windowHeight: window.innerHeight
      });
    }
    toggleNewConversation = () => {
      this.setMountedState({
        isOpenFindNameInput: !this.state.isOpenFindNameInput
      });
    };
    analyzeRoutes = async () => {
      const { pathname } = this.props.location;
      if (pathname === "/messenger") return;

      if (pathname === "/messenger/new") {
        return;
      }
      // handle path: /messenger/t/:id
      const roomId = this.props.match.params.id;
      if (!roomId) {
        const { rooms } = this.state;
        return this.props.history.push(`/messenger/t/${rooms[0].room._id}`);
      } else {
        try {
          const foundRoom = await this.checkRoomId(roomId);
          this.setCurrentRoom(foundRoom);
        } catch (error) {
          console.log("err", error);
          const { rooms } = this.state;
          if (pathname !== "/messenger")
            return this.props.history.push(`/messenger/t/${rooms[0].room._id}`);
        }
      }
    };
    checkRoomId = async roomId =>
      new Promise(async (resolve, reject) => {
        try {
          const res = await request({
            url: `/rooms/private/${roomId}`,
            method: "GET"
          });
          if (!res.data.value) reject("Room not found");
          const foundRoom = res.data.value.room;
          resolve(foundRoom);
        } catch (error) {
          reject(error);
        }
      });
    setCurrentRoom = foundRoom => {
      const targetId = foundRoom.room._id;
      socket.emit("join_room", targetId);
      this.setMountedState({
        currentRoomId: targetId,
        currentRoom: foundRoom.room
      });
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
          await this.setMountedState({
            rooms
          });
          resolve();
        } catch (error) {
          console.log("err", error);
          reject(error);
        }
      });
    chooseCurrentRoom = roomId => () => {
      this.setMountedState({ currentRoomId: roomId });
    };
    handleSocket = async () => {
      await connectSocket();
      // socket.emit("join_room", roomId);
      this.setMountedState({
        socketLoaded: true
      });
    };
    updateMsgTree = (id, data) => {
      this.setMountedState(prevState => {
        return {
          msgTree: {
            [id]: data
          }
        };
      });
    };
    setMountedState(props) {
      if (this._isMounted) this.setState(props);
    }
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
