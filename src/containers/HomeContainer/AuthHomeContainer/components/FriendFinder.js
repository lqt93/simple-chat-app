import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button
} from "@material-ui/core";
import InputSearch from "../../../../components/common/Input/InputSearch";
import withFriendFinderHandler from "../handlers/withFriendFinder";

const useStyles = makeStyles({
  root: {
    width: "50%"
  },
  textRow: {
    display: "flex",
    alignItems: "center",
    maxWidth: "50%",
    wordBreak: "break-word"
  }
});

const FriendFinder = ({ onChange, onSubmit, sendRequest, friends }) => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Find your friends:
      </Typography>
      <InputSearch
        inputName="search"
        onChange={onChange}
        onSubmit={onSubmit}
        placeholder="Find username or email"
      />
      {friends.length > 0 && (
        <List>
          {friends.map(friend => {
            return (
              <ListItem key={friend._id}>
                <ListItemText
                  primary={friend.fullName}
                  style={{ width: "50%" }}
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
                {!friend.isFriend && !friend.isRequested && (
                  <Button
                    onClick={sendRequest(friend._id, "waiting")}
                    disabled={friend.isLoading}
                  >
                    Add friend
                  </Button>
                )}
                {friend.isRequested && (
                  <Button
                    color="secondary"
                    onClick={sendRequest(friend._id, "new")}
                    disabled={friend.isLoading}
                  >
                    Request sent
                  </Button>
                )}
              </ListItem>
            );
          })}
        </List>
      )}
    </section>
  );
};

export default withFriendFinderHandler(FriendFinder);
