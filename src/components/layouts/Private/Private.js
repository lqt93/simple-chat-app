import React from "react";
import Header from "./Header";
import Body from "./Body";

const PrivateLayout = ({ children, ...rest }) => {
  return (
    <React.Fragment>
      <Header {...rest} />
      <Body>{children}</Body>
    </React.Fragment>
  );
};

export default PrivateLayout;
