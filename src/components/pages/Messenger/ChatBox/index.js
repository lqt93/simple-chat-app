import React from "react";
import List from "../../../common/List";
import Input from "./Input";

const MessageItem = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: data.isAuthOwner ? "row-reverse" : "row",
        margin: "0px 16px"
      }}
    >
      <div style={{}}>
        <div style={{ display: data.isAuthOwner ? "none" : "block" }}>
          <b>{data.owner.fullName} </b>
        </div>
        <div
          style={{
            backgroundColor: data.isAuthOwner ? "#3578E5" : "#f1f0f0",
            color: data.isAuthOwner ? "white" : "black",
            padding: 4,
            margin: "4px 0px"
          }}
        >
          {data.value}
        </div>
      </div>
    </div>
  );
};

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
        <div className="room-info">
          <strong>{roomInfo.name}</strong>
        </div>
        <div className="room-controls">
          <div className="room-controls__col room-controls__col--left">
            <div
              className="messages-container"
              ref={ref}
              onScroll={handleScroll}
            >
              {loadingMore && <div style={{ marginLeft: 50 }}>...loading</div>}
              <List list={messages} ItemComponent={MessageItem} />
            </div>
            <Input
              value={currentInput}
              handleChange={handleChange}
              submit={submit}
            />
          </div>
          <div className="room-controls__col room-controls__col--right" />
        </div>
      </div>
    );
  }
);

export default ChatBox;
