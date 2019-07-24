import React from "react";
import { throttle, debounce } from "throttle-debounce";
import request from "../../../utils/request";
import { socket, connectSocket, disconnectSocket } from "../../../utils/socket";

const INITIAL_STATE = {
  msgTree: {},
  rooms: [],
  socketLoaded: false,
  showingNewMessage: false,
  choosingNewMessage: false,
  receivers: [
    // {
    //   _id: "123",
    //   fullName: "Tester 1",
    //   username: "tester1",
    //   email: "tester1@simplechat.simplechat"
    // },
    // {
    //   _id: "421",
    //   fullName: "Tester-2",
    //   username: "tester2",
    //   email: "tester2@simplechat.simplechat"
    // },
    // {
    //   _id: "333",
    //   fullName: "Tester-3",
    //   username: "tester3",
    //   email: "tester3@simplechat.simplechat"
    // }
  ],
  chosenReceiverId: null,
  searchValue: "",
  searchList: [],
  loadingSearchList: false,
  isNoResult: false,
  newMsgValue: "",
  isSubmittingNewMsg: false
};

const withMessengerHandler = Messenger =>
  class MessengerHandler extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE, windowHeight: null };
      this._isMounted = false;
      this.delayedResize = throttle(500, this.windowResize);
      this.autocompleteSearchThrottled = debounce(500, this.autocompleteSearch);
    }
    componentDidMount = async () => {
      this._isMounted = true;
      this.searchUserInputRef = React.createRef();
      // get window's size
      this.setWindowSize();
      window.addEventListener("resize", this.delayedResize);
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
      window.removeEventListener("resize", this.delayedResize);
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
        { choosingNewMessage: false, showingNewMessage: false, receivers: [] },
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
      // e.persist();
      this.setMountedState({
        newMsgValue: e.target.value
      });
    };
    submitNewConversation = async e => {
      e.preventDefault();
      let { newMsgValue } = this.state;
      const { receivers, isSubmittingNewMsg } = this.state;
      newMsgValue = newMsgValue.trim();

      // stop if newMsgValue is empty
      // or submitNewConversation is in progress
      // or receiver-list is empty
      if (!newMsgValue || isSubmittingNewMsg || receivers.length === 0) return;

      this.setMountedState({
        isSubmittingNewMsg: true
      });

      // convert to _id array
      const members = receivers.map(receiver => receiver._id);

      try {
        const res = await request({
          url: `/rooms`,
          method: "POST",
          data: {
            members,
            firstMsg: newMsgValue
          }
        });
        this.closeNewConversation();
        this.setMountedState({
          isSubmittingNewMsg: false
        });
        const roomParticipant = res.data.value;
        roomParticipant.room.members = roomParticipant.room.members.filter(
          member => member._id !== this.props.authUser._id
        );
        this.setMountedState({
          rooms: [roomParticipant, ...this.state.rooms]
        });
        if (res.data.value._id)
          this.props.history.push(`/messenger/t/${roomParticipant.room._id}`);
      } catch (error) {
        console.log("error", error);
        this.setMountedState({
          isSubmittingNewMsg: false
        });
      }
    };
    // handle searching user input
    handleSearchUserInput = e => {
      e.persist();
      const keyword = e.target.value;
      this.setMountedState({ searchValue: keyword });
      this.autocompleteSearchThrottled(keyword);
    };
    autocompleteSearch = async keyword => {
      if (!keyword)
        return this.setMountedState({
          isNoResult: false,
          searchList: []
        });
      try {
        let searchCache = JSON.parse(localStorage.getItem("searchCache"));
        let searchList = [];
        this.setMountedState({
          loadingSearchList: true,
          isNoResult: false
        });
        if (!searchCache || (searchCache && !searchCache[keyword])) {
          const query = encodeURI(`?keyword=${keyword}`);
          const res = await request({
            url: `/users${query}`,
            method: "GET"
          });
          searchList = res.data.value;
          if (searchList.length > 0) {
            if (!searchCache) searchCache = {};
            searchCache[keyword] = searchList;
            localStorage.setItem("searchCache", JSON.stringify(searchCache));
          }
        } else {
          searchList = searchCache[keyword];
        }
        this.setMountedState({
          searchList,
          loadingSearchList: false,
          isNoResult: searchList.length === 0
        });
      } catch (error) {
        console.log("error", error);
        this.setMountedState({
          loadingSearchList: false
        });
      }
    };
    closeSearchDropdown = () => {
      this.setMountedState({
        searchList: [],
        loadingSearchList: false,
        isNoResult: false,
        isReceiverInputFocusing: false
      });
    };
    onFocusSearchUserInput = () => {
      this.setMountedState({ isReceiverInputFocusing: true });
      this.autocompleteSearch(this.state.searchValue);
    };
    handleKeyDownSearchUserInput = e => {
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
    clickOnSearchUserInput = () => {
      const { pathname } = this.props.location;
      if (pathname !== "/messenger/new") return;
      this.searchUserInputRef.current.focus();
    };
    // handle receivers
    addNewReceiver = person => async e => {
      await this.setState(prevState => {
        return {
          receivers: prevState.receivers.concat(person),
          searchValue: ""
        };
      });
      this.closeSearchDropdown();
      this.searchUserInputRef.current.focus();
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
      const { chosenReceiverId, isReceiverInputFocusing } = this.state;
      if (e.keyCode === 8 && isReceiverInputFocusing) {
        this.removeReceiver();
      }
      if (e.keyCode === 9 && !chosenReceiverId) {
        this.closeSearchDropdown();
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
        return this.props.history.push(
          `${
            rooms.length === 0
              ? "/messenger"
              : `/messenger/t/${rooms[0].room._id}`
          }`
        );
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
          searchUserInputRef={this.searchUserInputRef}
          closeNewConversation={this.closeNewConversation}
          chooseCurrentRoom={this.chooseCurrentRoom}
          updateMsgTree={this.updateMsgTree}
          removeRoom={this.removeRoom}
          chooseNewConversation={this.chooseNewConversation}
          addNewReceiver={this.addNewReceiver}
          removeReceiver={this.removeReceiver}
          chooseReceiverToRemove={this.chooseReceiverToRemove}
          clickOnSearchUserInput={this.clickOnSearchUserInput}
          handleSearchUserInput={this.handleSearchUserInput}
          handleKeyDownSearchUserInput={this.handleKeyDownSearchUserInput}
          unsetReceiverId={this.unsetReceiverId}
          closeSearchDropdown={this.closeSearchDropdown}
          onFocusSearchUserInput={this.onFocusSearchUserInput}
          handleNewMsgInput={this.handleNewMsgInput}
          submitNewConversation={this.submitNewConversation}
        />
      );
    }
  };

export default withMessengerHandler;
