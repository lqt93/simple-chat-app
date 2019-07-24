import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { ClickAwayListener } from "@material-ui/core";
import { generateRoomName } from "../../../utils/room";

const useStyles = makeStyles(theme =>
  createStyles({
    roomNameContainer: {
      padding: "14px 16px",
      boxSizing: "border-box",
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
      width: "100%"
    },
    roomNameGroup: {
      cursor: "pointer",
      border: "1px solid transparent",
      width: "100%",
      "&:hover": {
        border: "1px solid rgba(0, 0, 0, 0.2)"
      }
    },
    roomNameInput: {
      height: 17,
      fontSize: 18,
      fontFamily: "inherit",
      margin: 0,
      "&:focus": {
        outline: "none"
      }
    },
    submitButton: {
      background: "none",
      border: "none",
      padding: 0,
      margin: 0,
      marginLeft: theme.spacing(1),
      color: "#3578E5",
      cursor: "pointer",
      "&:focus": {
        opacity: "0.5",
        outline: "none",
        background: "none",
        border: "none"
      }
    }
  })
);

const RoomName = ({
  currentRoom,
  toggleRoomNameInput,
  isOpeningRoomNameInput,
  submitNewRoomName,
  handleKeyDownSubmitBtn,
  handleChangeNameInput
}) => {
  const classes = useStyles();
  return (
    <div className={classes.roomNameContainer}>
      {!isOpeningRoomNameInput && (
        <div className={classes.roomNameGroup} onClick={toggleRoomNameInput}>
          {generateRoomName(currentRoom)}
        </div>
      )}
      {isOpeningRoomNameInput && (
        <ClickAwayListener onClickAway={toggleRoomNameInput}>
          <form onSubmit={submitNewRoomName}>
            <input
              autoFocus
              className={classes.roomNameInput}
              defaultValue={currentRoom.name}
              onChange={handleChangeNameInput}
              placeholder="Name this"
            />
            <button
              onClick={submitNewRoomName}
              onKeyDown={handleKeyDownSubmitBtn}
              className={classes.submitButton}
              tabIndex="0"
            >
              Done
            </button>
          </form>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default RoomName;
