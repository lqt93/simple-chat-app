import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import List from "../../../../components/common/List";
import Input from "./Input";
import MessageItem from "./MessageItem";

const useStyles = makeStyles(theme =>
  createStyles({
    chatBoxContainer: {
      display: "flex",
      flex: "2 0 0%",
      flexDirection: "column",
      position: "relative"
    },
    presentation: {
      position: "relative",
      overflowY: "auto",
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)"
    }
  })
);

const ChatBox = React.forwardRef(
  (
    {
      messages,
      currentInput,
      handleChange,
      submit,
      handleScroll,
      loadingMore,
      windowHeight
    },
    ref
  ) => {
    const classes = useStyles();
    return (
      <div className={classes.chatBoxContainer}>
        <div
          className={classes.presentation}
          ref={ref}
          onScroll={handleScroll}
          style={{ height: windowHeight - 182 }}
        >
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
