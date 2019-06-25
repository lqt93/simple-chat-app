import React from "react";

function ChatBoxInput({ submit, handleChange, value }) {
  return (
    <form className="chatbox-form" onSubmit={submit}>
      <input
        className="chatbox-form__input"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type your message here"
      />
      <button className="chatbox-form__btn" type="submit">
        Enter
      </button>
    </form>
  );
}

export default ChatBoxInput;
