import React from "react";
import List from "../../../../components/common/List";
import RoomItem from "./RoomItem";
import FriendFinder from "./FriendFinder";
import FriendRequest from "./FriendRequest";
import FriendList from "./FriendList";

function AuthHome({ publicRooms, friendList, getFriendList, removeFriend }) {
  return (
    <div className="container container--deeper">
      <section className="public-chat-rooms">
        <h3> Explore the public chat rooms: </h3>
        <List list={publicRooms} ItemComponent={RoomItem} />
      </section>
      <FriendFinder />
      <FriendRequest getFriendList={getFriendList} />
      <FriendList
        friendList={friendList}
        getFriendList={getFriendList}
        removeFriend={removeFriend}
      />
    </div>
  );
}

export default AuthHome;
