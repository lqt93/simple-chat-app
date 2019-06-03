import React from "react";
import ChatBox from "../../../components/pages/Messenger/ChatBox";
import request from "../../../utils/request";
import socket from "../../../utils/socket";

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

class ChatBoxContainer extends React.Component {
  state = {
    ...INITIAL_STATE
  };
  componentDidMount() {
    this.msgContainerRef = React.createRef();
    this.getMessages();
    this.handleIncomingMessages();
  }
  handleIncomingMessages() {
    // handle incoming messages through socket's io
    socket.on("room_msg", async msg => {
      console.log("received msg:", msg);
      // look up in current msg list to check if incoming msg is exist or not
      const existMsg = this.state.messages.find(
        item => item.timeTicket === msg.timeTicket
      );
      if (existMsg) return;

      // add new messages to list
      await this.setState(prevState => {
        const messages = prevState.messages.concat(msg);
        return {
          messages
        };
      });

      // scroll to bottom to show new messages
      this.scrollToBottom();
    });
  }
  handleScroll = () => {
    const msgContainerElement = this.msgContainerRef.current;
    if (
      msgContainerElement.scrollTop === 0 &&
      !this.state.loadingMore &&
      this.state.count > this.state.messages.length
    ) {
      this.getMoreMessages(msgContainerElement);
    }
  };
  scrollToBottom() {
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
        // add new messages
        await this.setState(prevState => {
          const messages = res.data.value.messages.concat(prevState.messages);
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
        await this.setState({
          loadingMessages: false,
          messages: res.data.value.messages.reverse(),
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
