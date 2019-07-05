import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  privateLayoutBody: {}
});

const PrivateBody = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.privateLayoutBody}>{children}</div>;
};

export default PrivateBody;
