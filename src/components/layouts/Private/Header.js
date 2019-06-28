import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 32px"
  }
});

const PrivateHeader = ({ authUser, signOut }) => {
  const classes = useStyles();
  return (
    <header className={classes.root}>
      <div>
        <Link to="/"> SimpleChat </Link>
      </div>
      <div>
        <Link to="/settings"> Settings </Link>
        {authUser && <button onClick={signOut}>Sign out</button>}
      </div>
    </header>
  );
};

export default PrivateHeader;
