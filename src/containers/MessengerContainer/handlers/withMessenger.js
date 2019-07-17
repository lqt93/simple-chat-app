import React from "react";
import { throttle } from "throttle-debounce";
import request from "../../../utils/request";
import { socket, connectSocket, disconnectSocket } from "../../../utils/socket";

const INITIAL_STATE = {
  msgTree: {},
  rooms: [],
  socketLoaded: false,
  showingNewMessage: false,
  choosingNewMessage: false,
  receivers: [],
  chosenReceiverId: null,
  searchValue: ""
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
      this.newMsgInputRef = React.createRef();
      // get window's size
      this.setWindowSize();
      window.addEventListener("resize", this.delayedCallback);
      // handle key down
      window.addEventListener("keydown", this.handleKeyDown);
      // connect socket before getting rooms
      await this.handleSocket();
      // get list of rooms
      await this.getPrivateRooms();
      this.analyzeRoutes();
    };
    componentWillUnmount() {
      this._isMounted = false;
      // remove event listener
      window.removeEventListener("resize", this.delayedCallback);
      window.removeEventListener("keydown", this.handleKeyDown);
      // disconnect socket
      disconnectSocket();
    }
    componentWillReceiveProps(nextProps) {
      const currentRoomId = this.props.match.params.id;
      const nextRoomId = nextProps.match.params.id;
      if (currentRoomId !== nextRoomId) {
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
      const currentPathname = this.props.location.pathname;
      const nextPathname = nextProps.location.pathname;
      if (currentPathname !== nextPathname) {
        this.setMountedState({
          choosingNewMessage: nextPathname === "/messenger/new",
          showingNewMessage:
            (nextPathname === "/messenger/new" &&
              !this.state.showingNewMessage) ||
            this.state.showingNewMessage
        });
      }
    }
    //=====================================
    // handle window size
    //=====================================
    windowResize = () => {
      this.setWindowSize();
    };
    setWindowSize() {
      this.setMountedState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
      });
    }
    removeRoom = id => () => {
      if (id === "new") {
        this.closeNewConversation();
      }
    };
    //=====================================
    // handle creating new message
    //=====================================
    closeNewConversation = () => {
      this.setState(
        { choosingNewMessage: false, showingNewMessage: false },
        () => {
          if (this.state.windowWidth > 400) {
            this.props.history.push(
              `/messenger/t/${this.state.rooms[0].room._id}`
            );
          }
        }
      );
    };
    chooseNewConversation = () => {
      this.props.history.push("/messenger/new");
    };
    // handle new msg input
    handleNewMsgInput = e => {
      e.persist();
      this.setMountedState({ searchValue: e.target.value });
    };
    handleKeyDownNewMsgInput = e => {
      if (e.isComposing || e.keyCode === 229) {
        return;
      }
      if (
        e.keyCode === 8 &&
        !this.state.searchValue &&
        this.state.receivers.length > 0
      ) {
        this.removeReceiver("last");
      }
    };
    clickOnNewMsgInput = () => {
      const { pathname } = this.props.location;
      if (pathname !== "/messenger/new") return;
      this.newMsgInputRef.current.focus();
    };
    // handle receivers
    addNewReceiver = person => {
      this.setState(prevState => {
        return {
          receivers: prevState.push(person)
        };
      });
    };
    removeReceiver = position => {
      this.setState(prevState => {
        const lastReceivers = prevState.receivers;
        let targetId =
          position === "last"
            ? lastReceivers[lastReceivers.length - 1]._id
            : prevState.chosenReceiverId;
        const receivers = lastReceivers.filter(item => item._id !== targetId);
        return {
          receivers,
          chosenReceiverId: null
        };
      });
    };
    chooseReceiverToRemove = chosenReceiverId => () => {
      this.setState({ chosenReceiverId });
    };
    unsetReceiverId = e => {
      this.setState({ chosenReceiverId: null });
    };
    // handle window keydown to remove a receiver after choosing
    handleKeyDown = e => {
      if (e.isComposing || e.keyCode === 229) {
        return;
      }
      const { chosenReceiverId } = this.state;
      if (!chosenReceiverId) return;
      if (e.keyCode === 8) {
        this.removeReceiver();
      }
    };
    //=====================================
    // handle path
    //=====================================
    analyzeRoutes = async () => {
      const { pathname } = this.props.location;

      // handle root path
      if (pathname === "/messenger") return;

      // handle new message path
      if (pathname === "/messenger/new") {
        this.setMountedState({
          choosingNewMessage: true,
          showingNewMessage: true
        });
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
    //=====================================
    // handle current room
    //=====================================
    // check room's id in path
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
      foundRoom.room.members = foundRoom.room.members.filter(
        member => member._id !== this.props.authUser._id
      );
      this.setMountedState({
        currentRoomId: targetId,
        currentRoom: foundRoom.room
      });
    };
    chooseCurrentRoom = roomId => () => {
      this.setMountedState({ currentRoomId: roomId });
    };
    //=====================================
    // handle list of rooms
    //=====================================
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
    //=====================================
    // handle socket
    //=====================================
    handleSocket = async () => {
      await connectSocket();
      // socket.emit("join_room", roomId);
      this.setMountedState({
        socketLoaded: true
      });
    };
    //=====================================
    // others
    //=====================================
    updateMsgTree = (id, data) => {
      this.setMountedState({
        msgTree: {
          [id]: data
        }
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
          newMsgInputRef={this.newMsgInputRef}
          closeNewConversation={this.closeNewConversation}
          chooseCurrentRoom={this.chooseCurrentRoom}
          updateMsgTree={this.updateMsgTree}
          removeRoom={this.removeRoom}
          chooseNewConversation={this.chooseNewConversation}
          addNewReceiver={this.addNewReceiver}
          removeReceiver={this.removeReceiver}
          chooseReceiverToRemove={this.chooseReceiverToRemove}
          clickOnNewMsgInput={this.clickOnNewMsgInput}
          handleNewMsgInput={this.handleNewMsgInput}
          handleKeyDownNewMsgInput={this.handleKeyDownNewMsgInput}
          unsetReceiverId={this.unsetReceiverId}
        />
      );
    }
  };

export default withMessengerHandler;
