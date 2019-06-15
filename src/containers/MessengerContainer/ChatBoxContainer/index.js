import React from "react";
import ChatBox from "../../../components/pages/Messenger/ChatBox";
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

class ChatBoxContainer extends React.PureComponent {
  state = {
    ...INITIAL_STATE
  };
  componentDidMount() {
    this.msgContainerRef = React.createRef();
    // get current messages in room
    this.getMessages();
  }
  componentWillUnmount() {
    // remove socket's listener that handle incoming msg
    socket.removeListener("room_msg", this.handleIncomingMessages);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.socketLoaded !== nextProps.socketLoaded &&
      nextProps.socketLoaded === true
    ) {
      // handle incoming messages through socket's io
      socket.on("room_msg", this.handleIncomingMessages);
    }
  }
  handleIncomingMessages = async msg => {
    console.log("received msg:", msg);
    // look up in current msg list to check if incoming msg is exist or not
    const existMsg = await this.state.messages.find(
      item => item.timeTicket === msg.timeTicket
    );
    if (existMsg) return;

    // check incoming msg is belonged to current authUser or not
    const { authUser } = this.props;
    msg.isAuthOwner = authUser._id === msg.owner._id;

    // add new messages to list
    await this.setState(prevState => {
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
      this.state.count > this.state.messages.length
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
    const roomId = this.props.match.params.id;
    this.setState({
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
      if (res.data.status === "success") {
        // load more data success
        // get height of msgContainer before adding new messages
        let prevHeight = msgContainerElement.scrollHeight;
        // add new messages to state
        await this.setState(prevState => {
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
            skip: prevState.skip + STEP,
            loadingMore: false,
            count: res.data.value.count
          };
        });
        // keep scrollbar at the position before adding new messages
        msgContainerElement.scrollTop =
          msgContainerElement.scrollHeight - prevHeight;
      } else {
        // load more fail
        this.setState({
          loadingMore: false,
          error: res.data.message
        });
      }
    } catch (err) {
      // load more fail
      this.setState({
        loadingMore: false,
        error: err
      });
      console.log("err", err);
    }
  }
  async getMessages() {
    const roomId = this.props.match.params.id;
    this.setState({
      loadingMessages: true
    });
    try {
      const sort = {
        createdAt: "-1"
      };
      const query = encodeURI(`?limit=${STEP}&sort=${JSON.stringify(sort)}`);
      const res = await request({
        url: `/rooms/${roomId}/messages${query}`,
        method: "GET"
      });
      if (res.data.status === "success") {
        const { authUser } = this.props;
        let newMessages = res.data.value.messages.reverse();
        newMessages.map(msg => {
          msg.isAuthOwner = authUser._id === msg.owner._id;
          return msg;
        });
        await this.setState({
          loadingMessages: false,
          messages: newMessages,
          count: res.data.value.count,
          skip: STEP
        });
        this.scrollToBottom();
      } else {
        this.setState({
          loadingMessages: false,
          error: res.data.message
        });
      }
    } catch (err) {
      this.setState({
        loadingMessages: false,
        error: err
      });
      console.log("err", err);
    }
  }
  handleChange = e => {
    e.persist();
    this.setState({
      currentInput: e.target.value
    });
  };
  submit = async e => {
    e.preventDefault();
    const roomId = this.props.roomInfo._id;
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
    await this.setState(prevState => {
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
  render() {
    const { messages, currentInput, loadingMore } = this.state;
    const { roomInfo } = this.props;
    return (
      <ChatBox
        handleScroll={this.handleScroll}
        ref={this.msgContainerRef}
        loadingMore={loadingMore}
        messages={messages}
        roomInfo={roomInfo}
        currentInput={currentInput}
        handleChange={this.handleChange}
        submit={this.submit}
      />
    );
  }
}

export default ChatBoxContainer;
