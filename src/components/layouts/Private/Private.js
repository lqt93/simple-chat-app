import React from "react";
import Header from "./Header";
import Body from "./Body";

const PrivateLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Body>{children}</Body>
    </React.Fragment>
  );
};

export default PrivateLayout;
