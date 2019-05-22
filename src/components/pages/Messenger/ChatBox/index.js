import React from "react";
import List from "../../../common/List";
import Input from "./Input";

const MessageItem = ({ data }) => {
  return (
    <div>
      <span>
        <b>{data.owner.fullName}: </b>
      </span>
      <span> {data.value} </span>
    </div>
  );
};

const ChatBox = React.forwardRef(
  ({ messages, roomInfo, currentInput, handleChange, submit }, ref) => {
    return (
      <div>
        <h3>You are in {roomInfo.name}</h3>
        <div
          style={{
            overflowY: "scroll",
            height: 500
          }}
          ref={ref}
        >
          <List list={messages} ItemComponent={MessageItem} />
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
