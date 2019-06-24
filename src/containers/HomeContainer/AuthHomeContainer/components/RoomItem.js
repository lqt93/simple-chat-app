import React from "react";
import { Link } from "react-router-dom";

function RoomItem({ data }) {
  return (
    <Link to={`/messages/${data._id}`}>
      <li>{data.name} </li>
    </Link>
  );
}

export default RoomItem;
