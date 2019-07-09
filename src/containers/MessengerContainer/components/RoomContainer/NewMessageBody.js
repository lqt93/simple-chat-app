import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Input from "../ChatBox/Input";

const useStyles = makeStyles(theme =>
  createStyles({
    newMessageBody: {},
    newMessageBlock: {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)"
    }
  })
);

const NewMessageBody = ({ windowHeight }) => {
  const classes = useStyles();
  return (
    <div className={classes.newMessageBody}>
      <div
        className={classes.newMessageBlock}
        style={{ height: windowHeight - 182 }}
      />
      <Input />
    </div>
  );
};

export default NewMessageBody;
