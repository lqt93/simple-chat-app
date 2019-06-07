import React from "react";

function Body(props) {
  return (
    <div className="layout-body container container--deeper">
      {props.children}
    </div>
  );
}

export default Body;
