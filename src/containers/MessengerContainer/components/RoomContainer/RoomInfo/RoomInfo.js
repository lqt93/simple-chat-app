import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import RoomName from "./RoomName";

const useStyles = makeStyles(theme =>
  createStyles({
    infoPanel: {
      borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
      flex: "0 2 33.33%",
      maxWidth: 420,
      minWidth: 200,
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        display: "none"
      }
    }
  })
);

const RoomInfo = props => {
  const classes = useStyles();
  return (
    <div className={classes.infoPanel}>
      <RoomName {...props} />
    </div>
  );
};

export default RoomInfo;
