import React from "react";
import Header from "./Header";
import Body from "./Body";

const CommunityLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Body>{children}</Body>
    </React.Fragment>
  );
};

export default CommunityLayout;
