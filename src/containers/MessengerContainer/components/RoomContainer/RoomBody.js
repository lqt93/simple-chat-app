import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import ChatBox from "../ChatBox";
import RoomInfo from "./RoomInfo";

const useStyles = makeStyles(theme =>
  createStyles({
    roomBody: {
      display: "flex",
      flex: "1 1 0%"
    },
    infoPanel: {
      borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
      flex: "0 2 33.33%",
      maxWidth: 420,
      minWidth: 200,
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        display: "none"
      }
    }
  })
);

const RoomBody = props => {
  const classes = useStyles();
  return (
    <div className={classes.roomBody}>
      <ChatBox {...props} />
      <RoomInfo {...props} />
    </div>
  );
};

export default RoomBody;
