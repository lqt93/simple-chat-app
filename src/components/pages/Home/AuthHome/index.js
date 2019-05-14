import React from "react";
import List from "../../../common/List";
import RoomItem from "./RoomItem";

function AuthHome({ authUser, publicRooms }) {
  return (
    <div>
      <h3>Welcome {authUser.fullName ? `${authUser.fullName},` : ","}</h3>
      <hr />
      <List list={publicRooms} ItemComponent={RoomItem} />
    </div>
  );
}

export default AuthHome;
