import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { ListItem } from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    receiverItem: {
      backgroundColor: props =>
        props.isChosen ? "rgb(68, 193, 180)" : "rgb(186, 253, 246)",
      color: props => (props.isChosen ? "white" : theme.palette.primary.main),
      padding: "4px 8px",
      marginRight: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      cursor: "default",
      width: "auto"
    }
  })
);

const ReceiverItem = ({ data, isChosen, chooseReceiver }) => {
  const classes = useStyles({ isChosen });
  const { fullName } = data;
  return (
    <ListItem
      className={classes.receiverItem}
      onClick={chooseReceiver}
      onFocus={chooseReceiver}
      tabIndex={0}
    >
      {fullName}
    </ListItem>
  );
};

export default ReceiverItem;
