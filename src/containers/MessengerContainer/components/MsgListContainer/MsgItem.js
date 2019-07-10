import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import {
  AccountCircle as AccountCircleIcon,
  Clear as ClearIcon
} from "@material-ui/icons";
import { generateRoomName } from "../../utils/room";

const useStyles = makeStyles(theme =>
  createStyles({
    msgItem: {
      position: "relative",
      cursor: "pointer",
      background: props => props.chosenBackground,
      "& a": {
        textDecoration: "none",
        color: "black"
      },
      "&:hover": {
        background: "#f1f0f0"
      },
      "&:hover $clearIcon": {
        color: "black",
        pointerEvents: "auto"
      }
    },
    avatarIcon: {
      width: 50,
      height: 50
    },
    clearIcon: {
      fontSize: 18,
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(2),
      color: "transparent",
      pointerEvents: "none"
    }
  })
);

class ListItemLink extends React.PureComponent {
  renderLink = React.forwardRef((itemProps, ref) => (
    // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
    <RouterLink to={this.props.to} {...itemProps} ref={ref} />
  ));

  render() {
    const { children, className } = this.props;
    return (
      <li className={className}>
        <ListItem button component={this.renderLink}>
          {children}
        </ListItem>
      </li>
    );
  }
}

const RoomItem = ({ classes, roomName, _id }) => {
  return (
    <ListItemLink
      to={`/messenger/t/${_id}`}
      className={classes.msgItem}
      component
    >
      <ListItemAvatar>
        <Avatar>
          <AccountCircleIcon className={classes.avatarIcon} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={roomName} />
    </ListItemLink>
  );
};

const NewMsgItem = ({ classes, removeRoom, chooseNewConversation }) => {
  return (
    <div className={classes.msgItem}>
      <ListItem onClick={chooseNewConversation}>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon className={classes.avatarIcon} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="New message" />
      </ListItem>
      <ClearIcon className={classes.clearIcon} onClick={removeRoom("new")} />
    </div>
  );
};

const MsgItem = ({ data, isChosen, removeRoom, chooseNewConversation }) => {
  const classes = useStyles({
    chosenBackground: isChosen ? "#f1f0f0" : "white"
  });
  const { _id } = data;
  const roomName = generateRoomName(data);
  if (_id === "new")
    return (
      <NewMsgItem
        classes={classes}
        removeRoom={removeRoom}
        chooseNewConversation={chooseNewConversation}
      />
    );
  return <RoomItem classes={classes} roomName={roomName} _id={_id} />;
};

export default MsgItem;
