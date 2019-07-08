import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import MsgListHeader from "./MsgListHeader";
import MsgListDisplay from "./MsgListDisplay";

const useStyles = makeStyles(theme =>
  createStyles({
    msgListContainer: {
      display: "block",
      width: "25%",
      borderRight: "1px solid rgba(0, 0, 0, 0.2)",
      [theme.breakpoints.down("xs")]: {
        display: props => (props.isMessengerHome ? "block" : "none"),
        width: props => props.isMessengerHome && "100%"
      }
    }
  })
);

const MsgListContainer = props => {
  const classes = useStyles({
    isMessengerHome: props.location.pathname === "/messenger"
  });
  return (
    <div className={classes.msgListContainer}>
      <MsgListHeader {...props} />
      <MsgListDisplay {...props} />
    </div>
  );
};

export default MsgListContainer;
