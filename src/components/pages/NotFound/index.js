import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PublicLayout from "../../layouts/Public";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  msgContainer: {
    textAlign: "center"
  }
});

function NotFoundPage() {
  const classes = useStyles();
  return (
    <PublicLayout>
      <div className={classes.root}>
        <div className={classes.msgContainer}>
          <h1>
            <strong>404</strong>
          </h1>
          <p>
            <strong>Page not found</strong>
          </p>
          <p>
            Back to <Link to="/">Home page</Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}

export default NotFoundPage;
