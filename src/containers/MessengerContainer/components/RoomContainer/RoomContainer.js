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
  const { currentRoomId } = props;
  return (
    <div className={classes.roomContainer}>
      {currentRoomId && (
        <React.Fragment>
          <RoomHeader {...props} />
          <RoomBody {...props} />
        </React.Fragment>
      )}
    </div>
  );
};

export default RoomContainer;
