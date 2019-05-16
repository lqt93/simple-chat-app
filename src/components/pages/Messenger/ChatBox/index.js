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

function ChatBox({ messages, roomInfo, currentInput, handleChange, submit }) {
  return (
    <div>
      <h3>You are in {roomInfo.name}</h3>
      <List list={messages} ItemComponent={MessageItem} />
      <Input value={currentInput} handleChange={handleChange} submit={submit} />
    </div>
  );
}

export default ChatBox;
