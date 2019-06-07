import React from "react";
import List from "../../../common/List";
import RoomItem from "./RoomItem";

function AuthHome({ publicRooms }) {
  return (
    <div>
      <section className="public-chat-rooms">
        <h3> Explore the public chat rooms: </h3>
        <List list={publicRooms} ItemComponent={RoomItem} />
      </section>
    </div>
  );
}

export default AuthHome;
