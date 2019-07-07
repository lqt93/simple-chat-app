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

const Messenger = ({ rooms, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={classes.messengerContainer}>
      <MsgListContainer rooms={rooms} {...rest} />
      <RoomContainer {...rest} />
    </div>
  );
};

export default withMessengerHandler(Messenger);
