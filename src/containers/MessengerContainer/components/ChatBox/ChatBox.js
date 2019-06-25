import React from "react";
import List from "../../../../components/common/List";
import Input from "./Input";
import MessageItem from "./MessageItem";

const ChatBox = React.forwardRef(
  (
    { messages, currentInput, handleChange, submit, handleScroll, loadingMore },
    ref
  ) => {
    return (
      <div className="room-details__messages">
        <div className="messages-container" ref={ref} onScroll={handleScroll}>
          {loadingMore && <div style={{ marginLeft: 50 }}>...loading</div>}
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
    );
  }
);

export default ChatBox;
