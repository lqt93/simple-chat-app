import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import RoomHeader from "./RoomHeader";
import RoomBody from "./RoomBody";
import NewMsgBody from "./NewMsgBody";

const useStyles = makeStyles(theme =>
  createStyles({
    roomContainer: {
      width: "75%",
      display: props => (props.isMessengerHome ? "none" : "block"),
      [theme.breakpoints.down("xs")]: {
        display: props => props.isMessengerHome && "none",
        width: props => !props.isMessengerHome && "100%"
      }
    }
  })
);

const RoomContainer = props => {
  const classes = useStyles({
    isMessengerHome: props.location.pathname === "/messenger"
  });
  const { currentRoomId, choosingNewMessage } = props;
  return (
    <div className={classes.roomContainer}>
      <RoomHeader {...props} />
      {currentRoomId && <RoomBody {...props} />}
      {choosingNewMessage && <NewMsgBody {...props} />}
    </div>
  );
};

export default RoomContainer;
