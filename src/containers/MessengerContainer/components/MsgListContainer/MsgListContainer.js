import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import MsgListHeader from "./MsgListHeader";

const useStyles = makeStyles(theme =>
  createStyles({
    msgListContainer: {
      width: "25%",
      borderRight: "1px solid rgba(0, 0, 0, 0.2)"
    }
  })
);

const MsgListContainer = props => {
  const classes = useStyles();
  return (
    <div className={classes.msgListContainer}>
      <MsgListHeader {...props} />
    </div>
  );
};

export default MsgListContainer;
