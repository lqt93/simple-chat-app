import React from "react";
import { Link } from "react-router-dom";

function RoomItem({ data }) {
  return (
    <Link to={`/rooms/${data._id}`}>
      <li>{data.name} </li>
    </Link>
  );
}

export default RoomItem;
