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
      fontSize: 14,
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

const MsgItem = ({ data, isChosen, removeRoom }) => {
  const classes = useStyles({
    chosenBackground: isChosen ? "#f1f0f0" : "white"
  });
  const { _id } = data;
  const roomName = generateRoomName(data);
  return (
    <ListItemLink
      to={`/messenger/${_id !== "new" ? `t/${_id}` : "new"}`}
      className={classes.msgItem}
      component
    >
      <ListItemAvatar>
        <Avatar>
          <AccountCircleIcon className={classes.avatarIcon} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={roomName} />
      {_id === "new" && (
        <ClearIcon className={classes.clearIcon} onClick={removeRoom("new")} />
      )}
    </ListItemLink>
  );
};

export default MsgItem;
