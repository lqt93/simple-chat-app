import React from "react";
import { withRouter } from "react-router";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
// css
import "./Layout.css";

function Layout({ children, authUser, signOut, location }) {
  return (
    <div style={{ height: "inherit" }}>
      <Header authUser={authUser} signOut={signOut} location={location} />
      <Body>{children}</Body>
      {!authUser && <Footer />}
    </div>
  );
}

export default withRouter(Layout);
