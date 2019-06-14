import React from "react";
import List from "../../../common/List";
import Input from "./Input";
import MessageItem from "./MessageItem";

const ChatBox = React.forwardRef(
  (
    {
      messages,
      roomInfo,
      currentInput,
      handleChange,
      submit,
      handleScroll,
      loadingMore
    },
    ref
  ) => {
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
            <div className="room-details__messages">
              <div
                className="messages-container"
                ref={ref}
                onScroll={handleScroll}
              >
                {loadingMore && (
                  <div style={{ marginLeft: 50 }}>...loading</div>
                )}
                <List
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 16
                  }}
                  list={messages}
                  ItemComponent={MessageItem}
                />
              </div>
              <Input
                value={currentInput}
                handleChange={handleChange}
                submit={submit}
              />
            </div>
            <div className="room-details__settings" />
          </div>
        </div>
      </div>
    );
  }
);

export default ChatBox;
