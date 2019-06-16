import React from "react";

function List({ list, ItemComponent, style, ...rest }) {
  return (
    <ul style={style}>
      {list &&
        list.length > 0 &&
        list.map((item, index) => {
          return (
            <ItemComponent
              key={`${item.id || item._id}-${index}`}
              isFirst={index === 0}
              isLast={index === list.length - 1}
              data={item}
              {...rest}
            />
          );
        })}
    </ul>
  );
}

export default List;
