import React from "react";
import ChatBox from "../../../components/pages/Messenger/ChatBox";
import request from "../../../utils/request";
import socket from "../../../utils/socket";

const INITIAL_STATE = {
  messages: null,
  currentInput: "",
  loadingMessages: false
};

class ChatBoxContainer extends React.Component {
  state = {
    ...INITIAL_STATE
  };
  componentDidMount() {
    this.msgContainerRef = React.createRef();
    this.getMessages();
    const _this = this;
    const { authUser } = this.props;
    socket.on("room_msg", function(msg) {
      console.log("received msg:", msg);
      if (authUser._id !== msg.owner._id) {
        _this.setState(prevState => {
          const messages = prevState.messages.concat(msg);
          return {
            messages
          };
        });
      }
    });
  }
  scrollToBottom() {
    if (!this.msgContainerRef || !this.msgContainerRef.current) return;
    const target = this.msgContainerRef.current;
    const scrollHeight = target.scrollHeight;
    const height = target.clientHeight;
    const maxScrollTop = scrollHeight - height;
    target.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
  async getMessages() {
    const roomId = this.props.match.params.id;
    this.setState({
      loadingMessages: true
    });
    try {
      const res = await request({
        url: `/rooms/${roomId}/messages`,
        method: "GET"
      });
      if (res.data.status === "success") {
        await this.setState({
          loadingMessages: false,
          messages: res.data.value.messages
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
    const messageValue = this.state.currentInput;
    if (!messageValue) {
      return;
    }
    const owner = this.props.authUser;
    await this.setState(prevState => {
      const messages = prevState.messages.concat({
        value: messageValue,
        type: "text",
        owner: owner
      });
      return {
        messages,
        currentInput: ""
      };
    });
    this.scrollToBottom();
    try {
      const res = await request({
        url: `/messages`,
        method: "POST",
        data: {
          value: messageValue,
          roomId
        }
      });
    } catch (err) {
      console.log("err", err);
    }
  };
  render() {
    const { messages, currentInput } = this.state;
    const { roomInfo } = this.props;
    return (
      <ChatBox
        ref={this.msgContainerRef}
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
