import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Avatar
} from "@material-ui/core";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
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
      }
    },
    avatarIcon: {
      width: 50,
      height: 50
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

const MsgItem = ({ data, isChosen }) => {
  const classes = useStyles({
    chosenBackground: isChosen ? "#f1f0f0" : "white"
  });
  const { members, name, _id } = data;
  const roomName = name ? name : generateRoomName(members);
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

export default MsgItem;
