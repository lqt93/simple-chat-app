import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import { List } from "@material-ui/core";

const useStylesDropdown = makeStyles(theme =>
  createStyles({
    searchDropdownContainer: {
      position: "absolute",
      boxShadow: "0 1px 6px 0 rgba(0, 0, 0, .20)",
      border: "1px solid rgba(0, 0, 0, .20)",
      borderRadius: 6,
      left: 0,
      top: 67,
      width: 250,
      maxHeight: 320,
      flowY: "auto"
    },
    searchListContainer: {
      padding: "6px 0"
    },
    partTitle: {
      backgroundColor: "rgba(0, 0, 0, .03)",
      color: "rgba(0, 0, 0, .40)",
      padding: "0px 12px",
      fontSize: 13
    }
  })
);

const useStylesItem = makeStyles(theme =>
  createStyles({
    searchItem: {
      padding: "8px 16px",
      cursor: "default",
      "&:hover": {
        background: "#f1f0f0"
      }
    },
    itemAvatar: {
      minWidth: 0,
      marginRight: 16
    },
    avatarContainer: {
      width: 26,
      height: 26
    },
    avatarIcon: {
      width: 32,
      height: 32
    }
  })
);

const SearchDropdown = ({ searchList, loadingSearchList, isNoResult }) => {
  const classes = useStylesDropdown();
  if (loadingSearchList || searchList.length > 0 || isNoResult)
    return (
      <div className={classes.searchDropdownContainer}>
        <List className={classes.searchListContainer}>
          {searchList.length > 0 && (
            <div className={classes.partTitle}>Contacts</div>
          )}
          {searchList &&
            searchList.map(item => <SearchItem key={item._id} data={item} />)}
          {loadingSearchList && <LoadingItem />}
          {isNoResult && <NoResultItem />}
        </List>
      </div>
    );
  return null;
};

const SearchItem = ({ data }) => {
  const classes = useStylesItem();
  const { fullName } = data;
  return (
    <ListItem className={classes.searchItem}>
      <ListItemAvatar className={classes.itemAvatar}>
        <Avatar className={classes.avatarContainer}>
          <AccountCircleIcon className={classes.avatarIcon} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={fullName} />
    </ListItem>
  );
};

const LoadingItem = () => {
  const classes = useStylesItem();
  return (
    <ListItem className={classes.searchItem}>
      <CircularProgress size={20} style={{ marginRight: 16 }} />
      <Typography variant="body1">Searching</Typography>
    </ListItem>
  );
};

const NoResultItem = () => {
  return (
    <ListItem>
      <Typography variant="body1">No results found</Typography>
    </ListItem>
  );
};

export default SearchDropdown;
