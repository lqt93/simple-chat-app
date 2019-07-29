import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import RoomName from "./RoomName";
import RoomPeople from "./RoomPeople";

const useStyles = makeStyles(theme =>
  createStyles({
    infoPanel: {
      borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
      flex: "0 2 33.33%",
      maxWidth: 420,
      minWidth: 200,
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      [theme.breakpoints.down("xs")]: {
        display: "none"
      }
    }
  })
);

const RoomInfo = props => {
  const classes = useStyles();
  const { currentRoom, windowHeight } = props;
  return (
    <div className={classes.infoPanel} style={{ height: windowHeight - 132 }}>
      {currentRoom && (
        <React.Fragment>
          <RoomName {...props} />
          {currentRoom.type === "group" && <RoomPeople {...props} />}
        </React.Fragment>
      )}
    </div>
  );
};

export default RoomInfo;
