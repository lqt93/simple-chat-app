import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Message as MessageIcon,
  Group as GroupIcon,
  Domain as DomainIcon,
  PowerSettingsNew as PowerSettingsNewIcon,
  AccountCircle as AccountCircleIcon
} from "@material-ui/icons";
import withHeader from "./handlers/withHeader";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      "& a": {
        color: "black"
      }
    },
    grow: {
      flexGrow: 1
    },
    customAvatar: {
      width: 36,
      height: 36,
      fontSize: 18,
      marginRight: 8
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& a": {
          color: "white"
        }
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    }
  })
);

const getFirstLettersName = user => {
  if (!user.firstName || !user.lastName)
    return `${user.username[0].toUpperCase()}${user.username[1].toUpperCase()}`;
  return `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`;
};

const PrivateHeader = ({
  authUser,
  accountMenu,
  handleMenuOpen,
  handleMenuClose,
  handleClickAccountMenuItem,
  isOpenDrawer,
  toggleDrawer,
  handleClickDrawerItem
}) => {
  const classes = useStyles();

  const accountMenuId = "account-main-header-menu";

  const renderAccountMenu = (
    <Menu
      anchorEl={accountMenu}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={accountMenuId}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(accountMenu)}
      onClose={handleMenuClose("accountMenu")}
    >
      <MenuItem onClick={handleClickAccountMenuItem("/account")}>
        My account
      </MenuItem>
      <MenuItem onClick={handleClickAccountMenuItem("signOut")}>
        Sign out
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h5" className={classes.brand}>
          <Link to="/"> SimpleChat </Link>
        </Typography>
        <div className={classes.grow} />
        <div edge="end" className={classes.sectionDesktop}>
          <Link to="/communities">
            <IconButton aria-label="Show 11 new notifications" color="inherit">
              <Badge badgeContent={1} color="secondary">
                <DomainIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link to="/friends">
            <IconButton aria-label="Show 11 new notifications" color="inherit">
              <Badge badgeContent={5} color="secondary">
                <GroupIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link to="/messenger">
            <IconButton aria-label="Show 11 new notifications" color="inherit">
              <Badge badgeContent={11} color="secondary">
                <MessageIcon />
              </Badge>
            </IconButton>
          </Link>
          {authUser && (
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Current user's options"
              aria-controls={accountMenuId}
              aria-haspopup="true"
              onClick={handleMenuOpen("accountMenu")}
            >
              <Avatar className={classes.customAvatar}>
                {getFirstLettersName(authUser)}
              </Avatar>
              <Typography variant="body1"> {authUser.fullName} </Typography>
              <KeyboardArrowDownIcon />
            </IconButton>
          )}
        </div>
        <div edge="end" className={classes.sectionMobile}>
          <IconButton onClick={toggleDrawer(true)}>
            <Avatar className={classes.customAvatar}>
              {getFirstLettersName(authUser)}
            </Avatar>
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
      {renderAccountMenu}
      <Drawer anchor="right" open={isOpenDrawer} onClose={toggleDrawer(false)}>
        <List>
          <ListItem
            button
            onClick={handleClickDrawerItem("/communities")}
            key="Communities"
          >
            <ListItemIcon>
              <DomainIcon />
            </ListItemIcon>
            <ListItemText primary="Communities" />
          </ListItem>
          <ListItem
            button
            onClick={handleClickDrawerItem("/friends")}
            key="Friends"
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
          <ListItem
            button
            onClick={handleClickDrawerItem("/messenger")}
            key="Messenger"
          >
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Messenger" />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={handleClickDrawerItem("/account")}
            key="My account"
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My account" />
          </ListItem>
          <ListItem
            button
            onClick={handleClickDrawerItem("signOut")}
            key="Sign out"
          >
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default withHeader(PrivateHeader);
