import React from "react";
import ChatBox from "./ChatBox";
import withMessengerHandler from "../handlers/withMessenger";

const Messenger = props => {
  const { roomInfo } = props;
  return (
    <div className="chat-box-container">
      <div className="msg-list-container">
        <div className="msg-list-settings"> Settings </div>
      </div>
      <div className="room-container">
        <div className="room-info">
          <strong>{roomInfo.name}</strong>
        </div>
        <div className="room-details">
          <ChatBox {...props} />
          <div className="room-details__settings" />
        </div>
      </div>
    </div>
  );
};

Messenger.defaultProps = {
  roomInfo: {}
};

export default withMessengerHandler(Messenger);
