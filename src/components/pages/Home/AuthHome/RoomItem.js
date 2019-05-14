import React from "react";
import { Link } from "react-router-dom";

function RoomItem({ data }) {
  return (
    <li>
      <Link to={`/rooms/${data._id}`}>{data.name}</Link>
    </li>
  );
}

export default RoomItem;
