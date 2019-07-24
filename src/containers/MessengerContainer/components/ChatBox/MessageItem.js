import React from "react";

const MessageItem = ({ data }) => {
  return data.type === "text" ? (
    <TextMsg data={data} />
  ) : (
    <ActionMsg data={data} />
  );
};

const ActionMsg = ({ data }) => {
  return (
    <li
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: 16
      }}
    >
      {data.isAuthOwner ? "You" : data.owner.fullName}{" "}
      {!!data.value
        ? `named the group ${data.value}`
        : "removed the group name"}
      .
    </li>
  );
};

const TextMsg = ({ data }) => {
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
            padding: "6px 9px",
            borderRadius: 8,
            margin: "4px 0px",
            maxWidth: "100%",
            display: "inline-block"
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
