import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { IconButton, ClickAwayListener } from "@material-ui/core";
import { KeyboardArrowLeft } from "@material-ui/icons";
import { generateRoomName } from "../../utils/room";
import SearchUserInput from "./SearchUserInput";

const useStyles = makeStyles(theme =>
  createStyles({
    roomHeader: {
      minHeight: 50,
      position: "relative",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing(1),
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)"
    },
    backButton: {
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    banner: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1
    }
  })
);

const RoomHeader = ({
  location,
  currentRoom,
  choosingNewMessage,
  clickOnSearchUserInput,
  searchUserInputRef,
  closeSearchDropdown,
  authUser,
  ...rest
}) => {
  const classes = useStyles();
  const { pathname } = location;
  return (
    <ClickAwayListener onClickAway={closeSearchDropdown}>
      <div className={classes.roomHeader}>
        {pathname === "/messenger/new" && (
          <div className={classes.banner} onClick={clickOnSearchUserInput} />
        )}
        <Link to="/messenger">
          <IconButton className={classes.backButton}>
            <KeyboardArrowLeft />
          </IconButton>
        </Link>
        {currentRoom && !choosingNewMessage && (
          <strong>{generateRoomName(currentRoom, authUser)}</strong>
        )}
        {choosingNewMessage && (
          <SearchUserInput {...rest} ref={searchUserInputRef} />
        )}
      </div>
    </ClickAwayListener>
  );
};

export default RoomHeader;
