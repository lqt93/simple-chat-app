import React from "react";

function Wrapper(props) {
  return <div style={{ margin: 24, padding: 8 }}>{props.children}</div>;
}

export default Wrapper;
