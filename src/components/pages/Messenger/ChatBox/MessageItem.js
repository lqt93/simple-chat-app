import React from "react";

const MessageItem = ({ data }) => {
  return (
    <li
      style={{
        display: "flex",
        flexDirection: data.isAuthOwner ? "row-reverse" : "row",
        width: "100%",
        marginBottom: 16
      }}
    >
      <div style={{ maxWidth: "70%", wordBreak: "break-word" }}>
        <div style={{ display: data.isAuthOwner ? "none" : "block" }}>
          <b>{data.owner.fullName} </b>
        </div>
        <div
          style={{
            backgroundColor: data.isAuthOwner ? "#3578E5" : "#f1f0f0",
            color: data.isAuthOwner ? "white" : "black",
            padding: 4,
            margin: "4px 0px",
            maxWidth: "100%"
          }}
        >
          {data.value}
        </div>
      </div>
    </li>
  );
};

MessageItem.defaultProps = {
  data: {
    owner: {
      fullName: "Default User"
    },
    value: "text"
  }
};

export default MessageItem;
