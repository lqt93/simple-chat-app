import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
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
    }
  })
);

const RoomHeader = ({ currentRoom, isOpenFindNameInput }) => {
  const classes = useStyles();
  if (!currentRoom) return null;
  const roomName = currentRoom.name
    ? currentRoom.name
    : generateRoomName(currentRoom.members);
  return (
    <div className={classes.roomHeader}>
      {!isOpenFindNameInput && <strong>{roomName}</strong>}
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
