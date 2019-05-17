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
    this.getMessages();
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
        this.setState({
          loadingMessages: false,
          messages: res.data.value.messages
        });
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
    const owner = this.props.authUser;
    this.setState(prevState => {
      const newMessages = prevState.messages.push({
        value: messageValue,
        type: "text",
        owner: owner
      });
      return {
        messages: newMessages,
        ...prevState
      };
    });
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
    console.log("chat box props", this.props);
    return (
      <ChatBox
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
