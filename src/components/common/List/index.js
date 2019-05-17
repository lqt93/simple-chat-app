import React from "react";

function List({ list, ItemComponent }) {
  return (
    <ul>
      {list &&
        list.length > 0 &&
        list.map((item, index) => {
          return (
            <ItemComponent
              key={`${item.id || item._id}-${index}`}
              data={item}
            />
          );
        })}
    </ul>
  );
}

export default List;
