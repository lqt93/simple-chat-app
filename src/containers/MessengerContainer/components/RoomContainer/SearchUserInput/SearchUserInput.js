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

const SearchUserInput = React.forwardRef(
  (
    {
      receivers,
      chooseReceiverToRemove,
      chosenReceiverId,
      handleSearchUserInput,
      searchValue,
      handleKeyDownSearchUserInput,
      unsetReceiverId,
      searchList,
      loadingSearchList,
      isNoResult,
      onFocusSearchUserInput,
      addNewReceiver
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
          onFocus={onFocusSearchUserInput}
          value={searchValue}
          onChange={handleSearchUserInput}
          onKeyDown={handleKeyDownSearchUserInput}
          className={classes.newMsgInput}
          placeholder={!hasReceiver ? "Type the name of a person or group" : ""}
        />
        <SearchDropdown
          searchList={searchList}
          loadingSearchList={loadingSearchList}
          isNoResult={isNoResult}
          addNewReceiver={addNewReceiver}
        />
      </div>
    );
  }
);

export default SearchUserInput;
