import React from "react";

function ChatBoxInput({ submit, handleChange, value }) {
  return (
    <form onSubmit={submit}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type your message here"
      />
      <button type="submit">Enter</button>
    </form>
  );
}

export default ChatBoxInput;
