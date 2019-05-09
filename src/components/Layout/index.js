import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

function Layout(props) {
  return (
    <div>
      <Header />
      <Body>{props.children}</Body>
      <Footer />
    </div>
  );
}

export default Layout;
