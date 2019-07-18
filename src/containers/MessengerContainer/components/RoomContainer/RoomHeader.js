import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { KeyboardArrowLeft } from "@material-ui/icons";
import { generateRoomName } from "../../utils/room";
import NewMsgInput from "./NewMsgInput";

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
  clickOnNewMsgInput,
  newMsgInputRef,
  ...rest
}) => {
  const classes = useStyles();
  const { pathname } = location;
  return (
    <div className={classes.roomHeader}>
      {pathname === "/messenger/new" && (
        <div className={classes.banner} onClick={clickOnNewMsgInput} />
      )}
      <Link to="/messenger">
        <IconButton className={classes.backButton}>
          <KeyboardArrowLeft />
        </IconButton>
      </Link>
      {currentRoom && !choosingNewMessage && (
        <strong>{generateRoomName(currentRoom)}</strong>
      )}
      {choosingNewMessage && <NewMsgInput {...rest} ref={newMsgInputRef} />}
    </div>
  );
};

export default RoomHeader;
