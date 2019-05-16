import React from "react";
import ChatBox from "../../../components/pages/Messenger/ChatBox";
import request from "../../../utils/request";

const INITIAL_STATE = {
  messages: null,
  currentInput: "",
  loading: false
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
      loading: true
    });
    try {
      const res = await request({
        url: `/rooms/${roomId}/messages`,
        method: "GET"
      });
      if (res.data.status === "success") {
        this.setState({
          loading: false,
          messages: res.data.value.messages
        });
      } else {
        this.setState({
          loading: false,
          error: res.data.message
        });
      }
    } catch (err) {
      this.setState({
        loading: false,
        error: err
      });
      console.log("err", err);
    }
  }
  handleChange = e => {};
  submit = e => {};
  render() {
    const { messages, currentInput } = this.state;
    const { roomInfo } = this.props;
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
