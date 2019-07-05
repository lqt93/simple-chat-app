import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import RoomHeader from "./RoomHeader";
import RoomBody from "./RoomBody";

const useStyles = makeStyles(theme =>
  createStyles({
    roomContainer: {
      width: "75%"
    }
  })
);

const RoomContainer = props => {
  const classes = useStyles();
  return (
    <div className={classes.roomContainer}>
      <RoomHeader {...props} />
      <RoomBody {...props} />
    </div>
  );
};

export default RoomContainer;
