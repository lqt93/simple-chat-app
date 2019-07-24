import React from "react";
import request from "../../../utils/request";
import { socket } from "../../../utils/socket";

const INITIAL_STATE = {
  messages: null,
  currentInput: "",
  skip: 0,
  count: 0,
  loadingMessages: false,
  loadingMore: false
};

// the number of messages that will be loaded each time
const STEP = 30;

const withChatBoxHandler = ChatBox =>
  class ChatBoxHandler extends React.PureComponent {
    _isMounted = false;
    loadingRoomId = null;
    state = { ...INITIAL_STATE };
    componentDidMount() {
      this._isMounted = true;
      this.msgContainerRef = React.createRef();
      this.getMessages(this.props.currentRoomId);
      // handle incoming messages through socket's io
      socket.on("room_msg", this.handleIncomingMessages);
      this.setMountedState({ roomListenEvent: true });
    }
    componentWillReceiveProps = async nextProps => {
      const currentRoomId = this.props.currentRoomId;
      const nextRoomId = nextProps.currentRoomId;
      if (currentRoomId !== nextRoomId) {
        if (currentRoomId && this.state.messages) {
          this.props.updateMsgTree(currentRoomId, this.state.messages);
        }

        let savedRoomMessages = this.props.msgTree[nextRoomId];
        // if this room has not loaded messages
        if (!savedRoomMessages || savedRoomMessages.length === 0) {
          // get messages first time
          this.getMessages(nextRoomId);
        } else {
          // if this room's messages are loaded and saved
          // call request to check if there is any new message sent to this room
          this.loadingRoomId = nextRoomId;
          this.setMountedState({ loadingMessages: true });
          const resObj = await this.requestGetMessage(nextRoomId);
          const resMessages = resObj.messages;
          const savedLastItem = savedRoomMessages[savedRoomMessages.length - 1];
          const resLastItem = resMessages[resMessages.length - 1];
          let messages = savedRoomMessages;
          if (savedLastItem._id !== resLastItem._id) {
            let targetIndex = null;
            for (let i in resMessages) {
              if (resMessages[i]._id === savedLastItem._id) {
                targetIndex = i;
                break;
              }
            }
            if (typeof targetIndex === "number" && targetIndex > 0) {
              const additionalMessages = resMessages.slice(
                Number(targetIndex) + 1,
                resMessages.length
              );
              messages = savedRoomMessages.concat(additionalMessages);
            } else {
              messages = resMessages;
            }
          }
          if (nextRoomId !== this.loadingRoomId) return;
          await this.setMountedState({
            ...INITIAL_STATE,
            messages,
            changeRoom: true,
            loadingMessages: false,
            skip: messages.length,
            count: resObj.count
          });
          this.scrollToBottom();
        }
      }
    };
    componentWillUnmount() {
      this._isMounted = false;
      const roomId = this.props.currentRoomId;
      if (!roomId || !this.state.roomListenEvent) return;
      // remove socket's listener that handle incoming msg
      socket.removeListener("room_msg", this.handleIncomingMessages);
      // remove window's size event
      window.removeEventListener("resize", this.delayedCallback);
    }

    handleIncomingMessages = async msg => {
      console.log("received msg:", msg);
      let isExistMsg = false;

      // check incoming msg is belonged to current authUser or not
      const { authUser } = this.props;
      msg.isAuthOwner = authUser._id === msg.owner._id;

      let updatingMessages = [];
      if (msg.type === "text") {
        // look up in current msg list to check if incoming msg is exist or not
        updatingMessages = this.state.messages.map(item => {
          if (item.timeTicket === msg.timeTicket) {
            isExistMsg = true;
            item = msg;
          }
          return item;
        });
      }

      if (msg.type.indexOf("action") >= 0) {
        updatingMessages = this.state.messages.concat(msg);
      }

      if (isExistMsg)
        return this.setMountedState({
          messages: updatingMessages
        });

      // add new messages to list
      await this.setMountedState(prevState => {
        const messages = prevState.messages.concat(msg);
        return {
          messages
        };
      });

      // scroll to bottom to show new messages
      this.scrollToBottom();
    };
    handleScroll = () => {
      const msgContainerElement = this.msgContainerRef.current;

      // load more previous messages when:
      // + if scroll to the top of the msg_container
      // + if number of messages in msg_container is less than total messages in room
      // (!): scrollTop is the position of the scrollBar
      if (
        msgContainerElement.scrollTop === 0 &&
        !this.state.loadingMore &&
        !this.state.loadingMessages &&
        this.state.count > (this.state.messages && this.state.messages.length)
      ) {
        // load previous messages
        this.getMoreMessages(msgContainerElement);
      }
    };
    scrollToBottom() {
      // does not exec function when ref has not created
      if (!this.msgContainerRef || !this.msgContainerRef.current) return;
      const msgContainerElement = this.msgContainerRef.current;
      const scrollHeight = msgContainerElement.scrollHeight;
      const height = msgContainerElement.clientHeight;
      const maxScrollTop = scrollHeight - height;
      msgContainerElement.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
    async getMoreMessages(msgContainerElement) {
      const roomId = this.props.currentRoomId;
      if (!roomId) return;
      if (this.state.loadingMore || this.state.loadingMessages) return;
      this.setMountedState({
        loadingMore: true
      });
      try {
        const { skip } = this.state;
        const sort = {
          createdAt: "-1"
        };
        const query = encodeURI(
          `?skip=${skip === 0 ? skip + STEP : skip}&sort=${JSON.stringify(
            sort
          )}&limit=${STEP}`
        );
        const res = await request({
          url: `/rooms/${roomId}/messages${query}`,
          method: "GET"
        });

        // load more data success
        // get height of msgContainer before adding new messages
        let prevHeight = msgContainerElement.scrollHeight;
        // add new messages to state
        await this.setMountedState(prevState => {
          const { authUser } = this.props;
          let newMessages = res.data.value.messages;
          // check owner of all new messages
          newMessages = newMessages.map(msg => {
            msg.isAuthOwner = authUser._id === msg.owner._id;
            return msg;
          });
          // create new messages list
          let messages = newMessages.concat(prevState.messages);
          return {
            messages,
            skip: prevState.skip + newMessages.length,
            loadingMore: false,
            count: res.data.value.count
          };
        });
        // keep scrollbar at the position before adding new messages
        msgContainerElement.scrollTop =
          msgContainerElement.scrollHeight - prevHeight;
      } catch (err) {
        // load more fail
        this.setMountedState({
          loadingMore: false,
          error: err
        });
        console.log("err", err);
      }
    }
    requestGetMessage = roomId => {
      return new Promise(async (resolve, reject) => {
        try {
          const sort = {
            createdAt: "-1"
          };
          const query = encodeURI(
            `?limit=${STEP}&sort=${JSON.stringify(sort)}`
          );
          const res = await request({
            url: `/rooms/${roomId}/messages${query}`,
            method: "GET"
          });

          const { authUser } = this.props;
          let newMessages = res.data.value.messages.reverse();
          newMessages.map(msg => {
            msg.isAuthOwner = authUser._id === msg.owner._id;
            return msg;
          });
          resolve({
            messages: newMessages,
            count: res.data.value.count
          });
        } catch (error) {
          reject(error);
        }
      });
    };
    async getMessages(roomId) {
      if (!roomId) return;
      this.loadingRoomId = roomId;
      this.setMountedState({
        loadingMessages: true
      });
      try {
        const resObj = await this.requestGetMessage(roomId);
        if (roomId !== this.loadingRoomId) return;
        await this.setMountedState({
          loadingMessages: false,
          messages: resObj.messages,
          count: resObj.count,
          skip: resObj.messages.length
        });
        this.scrollToBottom();
      } catch (err) {
        this.setMountedState({
          loadingMessages: false,
          error: err
        });
        console.log("err", err);
      }
    }
    handleChange = e => {
      e.persist();
      this.setMountedState({
        currentInput: e.target.value
      });
    };
    submit = async e => {
      e.preventDefault();
      const roomId = this.props.currentRoomId;
      // handle message's value before saving
      const messageValue = this.handleMsgValue(this.state.currentInput);
      // break if msg value is empty
      if (!messageValue) {
        return;
      }
      const owner = this.props.authUser;
      // create time ticket to verify this message in other devices through socket
      const timeTicket = String(new Date());

      // add new message to list
      await this.setMountedState(prevState => {
        const messages = prevState.messages.concat({
          value: messageValue,
          type: "text",
          owner: owner,
          isAuthOwner: true,
          timeTicket: timeTicket
        });
        return {
          messages,
          currentInput: ""
        };
      });

      // scroll to bottom
      this.scrollToBottom();

      // deliver message to server
      try {
        const res = await request({
          url: `/messages`,
          method: "POST",
          data: {
            value: messageValue,
            roomId,
            timeTicket: timeTicket
          }
        });
      } catch (err) {
        console.log("err", err);
      }
    };
    handleMsgValue(str) {
      return str.trim();
    }
    setMountedState(props) {
      if (this._isMounted) this.setState(props);
    }
    render() {
      return (
        <ChatBox
          {...this.state}
          {...this.props}
          handleScroll={this.handleScroll}
          ref={this.msgContainerRef}
          handleChange={this.handleChange}
          submit={this.submit}
        />
      );
    }
  };

export default withChatBoxHandler;
