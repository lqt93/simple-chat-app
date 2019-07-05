import React from "react";
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

const MsgListHeader = ({ toggleNewConversation }) => {
  const classes = useStyles();
  return (
    <div className={classes.msgListHeader}>
      <Typography variant="h6" className={classes.title}>
        Messenger
      </Typography>
      <IconButton onClick={toggleNewConversation}>
        <CreateIcon />
      </IconButton>
    </div>
  );
};

export default MsgListHeader;
