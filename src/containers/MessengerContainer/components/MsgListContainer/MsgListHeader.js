import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@material-ui/core";
import { Create as CreateIcon } from "@material-ui/icons";

const useStyles = makeStyles(theme =>
  createStyles({
    msgListHeader: {
      minHeight: 50,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing(1),
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)"
    },
    title: {
      flexBasis: "100%",
      textAlign: "center"
    }
  })
);

const MsgListHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.msgListHeader}>
      <Typography variant="h6" className={classes.title}>
        Messenger
      </Typography>
      <Link to="/messenger/new">
        <IconButton>
          <CreateIcon />
        </IconButton>
      </Link>
    </div>
  );
};

export default MsgListHeader;
