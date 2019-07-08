import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { KeyboardArrowLeft } from "@material-ui/icons";
import { generateRoomName } from "../../utils/room";

const useStyles = makeStyles(theme =>
  createStyles({
    roomHeader: {
      minHeight: 50,
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
    }
  })
);

const RoomHeader = ({ currentRoom, isOpenFindNameInput }) => {
  const classes = useStyles();
  return (
    <div className={classes.roomHeader}>
      <Link to="/messenger">
        <IconButton className={classes.backButton}>
          <KeyboardArrowLeft />
        </IconButton>
      </Link>
      {currentRoom && !isOpenFindNameInput && (
        <strong>{generateRoomName(currentRoom)}</strong>
      )}
      {isOpenFindNameInput && (
        <input
          style={{ width: 250 }}
          placeholder="Type the name of a person or group"
        />
      )}
    </div>
  );
};

export default RoomHeader;
