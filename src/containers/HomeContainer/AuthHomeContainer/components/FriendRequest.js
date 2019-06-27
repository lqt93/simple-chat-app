import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider
} from "@material-ui/core";
import withFriendRequestHandler from "../handlers/withFriendRequest";
const useStyles = makeStyles({
  root: {
    width: "50%"
  },
  textRow: {
    display: "flex",
    alignItems: "center",
    wordBreak: "break-word"
  },
  itemRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  listItem: {
    flexDirection: "column"
  }
});
const FriendRequest = ({ friends, accceptFriendRequest, deleteRequest }) => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Your requests:
      </Typography>
      {friends.length > 0 && (
        <List>
          {friends.map(friend => {
            return (
              <ListItem key={friend._id} className={classes.listItem}>
                <div className={classes.itemRow}>
                  <ListItemText
                    primary={friend.fullName}
                    secondary={
                      <React.Fragment>
                        {friend.username && (
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                            className={classes.textRow}
                          >
                            @{friend.username}
                          </Typography>
                        )}
                        {friend.email && (
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                            className={classes.textRow}
                          >
                            <svg
                              className="MuiSvgIcon-root"
                              style={{ fontSize: 16 }}
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#000000"
                                d="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4M12,11L20,6H4L12,11M4,18H20V8.37L12,13.36L4,8.37V18Z"
                              />
                            </svg>
                            {friend.email}
                          </Typography>
                        )}
                      </React.Fragment>
                    }
                  />
                </div>
                <div className={classes.itemRow}>
                  <Button
                    onClick={accceptFriendRequest(friend._id)}
                    disabled={friend.isLoading}
                  >
                    Accept
                  </Button>
                  <Button
                    color="secondary"
                    onClick={deleteRequest(friend._id)}
                    disabled={friend.isLoading}
                  >
                    Delete
                  </Button>
                </div>
                <Divider />
              </ListItem>
            );
          })}
        </List>
      )}
    </section>
  );
};

export default withFriendRequestHandler(FriendRequest);
