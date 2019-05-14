import React from "react";

function List({ list, ItemComponent }) {
  return (
    <ul>
      {list &&
        list.length > 0 &&
        list.map(item => {
          return <ItemComponent key={item.id || item._id} data={item} />;
        })}
    </ul>
  );
}

export default List;
