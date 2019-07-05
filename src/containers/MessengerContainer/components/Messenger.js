import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import withMessengerHandler from "../handlers/withMessenger";
import MsgListContainer from "./MsgListContainer";
import RoomContainer from "./RoomContainer";

const useStyles = makeStyles(theme =>
  createStyles({
    messengerContainer: {
      display: "flex",
      height: "100%"
    }
  })
);

const Messenger = props => {
  const classes = useStyles();
  return (
    <div className={classes.messengerContainer}>
      <MsgListContainer {...props} />
      <RoomContainer {...props} />
    </div>
  );
};

Messenger.defaultProps = {
  roomInfo: {}
};

export default withMessengerHandler(Messenger);
