import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import RoomExpansionPanel from "./RoomExpansionPanel";

const useStyles = makeStyles(theme =>
  createStyles({
    roomPeople: {},
    peopleList: {
      padding: 0
    }
  })
);

const useStylesPeopleCard = makeStyles(theme =>
  createStyles({
    avatarIcon: {
      width: 50,
      height: 50
    }
  })
);

const RoomPeople = ({ currentRoom }) => {
  const classes = useStyles();
  const { members } = currentRoom;
  return (
    <RoomExpansionPanel title="People" className={classes.roomPeople}>
      <List className={classes.peopleList}>
        {members &&
          members.length > 0 &&
          members.map(member => <PeopleCard key={member._id} data={member} />)}
      </List>
    </RoomExpansionPanel>
  );
};

const PeopleCard = ({ data }) => {
  const classes = useStylesPeopleCard();
  const { fullName } = data;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <AccountCircleIcon className={classes.avatarIcon} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={fullName} />
    </ListItem>
  );
};

export default RoomPeople;
