import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import ReceiverItem from "./ReceiverItem";

const useStyles = makeStyles(theme =>
  createStyles({
    receiverList: {
      display: "flex",
      flexDirection: "row",
      zIndex: 2
    }
  })
);

const ReceiverList = ({
  receivers,
  chosenReceiverId,
  chooseReceiverToRemove,
  unsetReceiverId
}) => {
  const classes = useStyles();
  if (receivers.length === 0) return null;
  return (
    <List className={classes.receiverList} onBlur={unsetReceiverId}>
      {receivers.map(user => {
        return (
          <ReceiverItem
            key={user._id}
            data={user}
            isChosen={chosenReceiverId === user._id}
            chooseReceiver={chooseReceiverToRemove(user._id)}
          />
        );
      })}
    </List>
  );
};

export default ReceiverList;
