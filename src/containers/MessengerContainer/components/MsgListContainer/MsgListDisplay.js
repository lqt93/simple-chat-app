import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import MsgItem from "./MsgItem";

const useStyles = makeStyles(theme =>
  createStyles({
    msgListDisplay: {
      overflowY: "auto"
    }
  })
);

const MsgListDisplay = ({
  rooms,
  currentRoomId,
  windowHeight,
  choosingNewMessage,
  showingNewMessage,
  removeRoom,
  chooseNewConversation
}) => {
  const classes = useStyles();
  return (
    <div
      className={classes.msgListDisplay}
      style={{ height: windowHeight - 131 }}
    >
      <List>
        {showingNewMessage && (
          <MsgItem
            key="new messge"
            data={{
              _id: "new"
            }}
            isChosen={choosingNewMessage}
            removeRoom={removeRoom}
            chooseNewConversation={chooseNewConversation}
          />
        )}
        {rooms &&
          rooms.map(item => {
            return (
              <MsgItem
                key={item._id}
                data={item.room}
                isChosen={currentRoomId === item.room._id}
              />
            );
          })}
      </List>
    </div>
  );
};

MsgListDisplay.defaultProps = {
  rooms: []
};

export default MsgListDisplay;
