import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import ReceiverList from "./ReceiverList";

const useStyles = makeStyles(theme =>
  createStyles({
    inputContainer: {
      width: "100%",
      display: "flex"
    },
    newMsgInput: {
      minWidth: props => (props.hasReceiver ? 60 : 250),
      maxWidth: 300,
      height: 29,
      marginTop: 8,
      border: "none",
      zIndex: 2,
      "&:focus": {
        outline: "none"
      }
    }
  })
);

const NewMsgInput = React.forwardRef(
  ({ receivers, chooseReceiverToRemove, chosenReceiverId }, ref) => {
    const hasReceiver = receivers.length > 0;
    const classes = useStyles({ hasReceiver });
    return (
      <div className={classes.inputContainer}>
        <ReceiverList
          receivers={receivers}
          chosenReceiverId={chosenReceiverId}
          chooseReceiverToRemove={chooseReceiverToRemove}
        />
        <input
          autoFocus
          ref={ref}
          className={classes.newMsgInput}
          placeholder={!hasReceiver ? "Type the name of a person or group" : ""}
        />
      </div>
    );
  }
);

export default NewMsgInput;