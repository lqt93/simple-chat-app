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
      <div>
        <h3>You are in {roomInfo.name}</h3>
        <div
          style={{
            overflowY: "scroll",
            height: 500
          }}
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
    );
  }
);

export default ChatBox;
