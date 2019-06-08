import React from "react";
import { withRouter } from "react-router";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
// css
import "./Layout.css";

function Layout({ children, authUser, signOut, location }) {
  return (
    <div>
      <Header authUser={authUser} signOut={signOut} />
      <Body>{children}</Body>
      {!authUser && location.pathname === "/" && <Footer />}
    </div>
  );
}

export default withRouter(Layout);
