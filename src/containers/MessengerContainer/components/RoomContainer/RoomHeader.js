import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

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

const RoomHeader = ({ roomInfo, isOpenFindNameInput }) => {
  const classes = useStyles();
  return (
    <div className={classes.roomHeader}>
      {!isOpenFindNameInput && <strong>{roomInfo.name}</strong>}
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
