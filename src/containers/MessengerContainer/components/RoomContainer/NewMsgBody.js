import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import Input from "../ChatBox/Input";

const useStyles = makeStyles(theme =>
  createStyles({
    newMsgBody: {},
    newMsgBlock: {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
      flowY: "auto"
    },
    receiverInfo: {
      display: "flex",
      flexDirection: "row",
      padding: theme.spacing(3),
      borderBottom: "1px solid rgba(0, 0, 0, .05)"
    },
    avatarContainer: {
      width: 60,
      height: 60,
      marginRight: theme.spacing(2)
    },
    avatarIcon: {
      width: 80,
      height: 80
    },
    infoContainer: {},
    infoName: {
      color: theme.palette.primary.main
    },
    infoSub: {
      color: "rgba(0, 0, 0, .40)",
      fontSize: theme.typography.fontSize,
      marginBottom: theme.spacing(0.5)
    }
  })
);

const NewMsgBody = ({ windowHeight, receivers }) => {
  const classes = useStyles();
  const firstUser = receivers[0];
  return (
    <div className={classes.newMsgBody}>
      <div
        className={classes.newMsgBlock}
        style={{ height: windowHeight - 182 }}
      >
        {receivers && receivers.length === 1 && (
          <ReceiverInfo classes={classes} data={firstUser} />
        )}
      </div>
      <Input />
    </div>
  );
};

const ReceiverInfo = ({ classes, data }) => {
  const { fullName, username, email } = data;
  return (
    <div className={classes.receiverInfo}>
      <Avatar className={classes.avatarContainer}>
        <AccountCircleIcon className={classes.avatarIcon} />
      </Avatar>
      <div className={classes.infoContainer}>
        <Typography variant="h6" className={classes.infoName}>
          {fullName}
        </Typography>
        <div className={classes.infoSub}>@ {username} </div>
        <div className={classes.infoSub}>{email}</div>
      </div>
    </div>
  );
};

export default NewMsgBody;
