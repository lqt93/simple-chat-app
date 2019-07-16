import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    receiverItem: {
      backgroundColor: props =>
        props.isChosen ? "rgb(68, 193, 180)" : "rgb(186, 253, 246)",
      color: props => (props.isChosen ? "white" : theme.palette.primary.main),
      padding: "4px 8px",
      marginRight: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      cursor: "default"
    }
  })
);

const ReceiverItem = ({ data, isChosen, onClick }) => {
  const classes = useStyles({ isChosen });
  const { fullName } = data;
  return (
    <div className={classes.receiverItem} onClick={onClick}>
      {fullName}
    </div>
  );
};

export default ReceiverItem;
