import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import ReceiverList from "./ReceiverList";
import SearchDropdown from "./SearchDropdown";

const useStyles = makeStyles(theme =>
  createStyles({
    inputContainer: {
      width: "100%",
      display: "flex",
      position: "relative"
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
  (
    {
      receivers,
      chooseReceiverToRemove,
      chosenReceiverId,
      handleNewMsgInput,
      searchValue,
      handleKeyDownNewMsgInput,
      unsetReceiverId,
      searchList,
      loadingSearchList,
      isNoResult,
      closeSearchDropdown,
      onFocusNewMsgInput
    },
    ref
  ) => {
    const hasReceiver = receivers.length > 0;
    const classes = useStyles({ hasReceiver });
    return (
      <div className={classes.inputContainer}>
        <ReceiverList
          receivers={receivers}
          chosenReceiverId={chosenReceiverId}
          chooseReceiverToRemove={chooseReceiverToRemove}
          unsetReceiverId={unsetReceiverId}
        />
        <input
          autoFocus
          ref={ref}
          onFocus={onFocusNewMsgInput}
          onBlur={closeSearchDropdown}
          value={searchValue}
          onChange={handleNewMsgInput}
          onKeyDown={handleKeyDownNewMsgInput}
          className={classes.newMsgInput}
          placeholder={!hasReceiver ? "Type the name of a person or group" : ""}
        />
        <SearchDropdown
          searchList={searchList}
          loadingSearchList={loadingSearchList}
          isNoResult={isNoResult}
        />
      </div>
    );
  }
);

export default NewMsgInput;
