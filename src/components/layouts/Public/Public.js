import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
// css
import "./Layout.css";

function PublicLayout({ children, authUser, signOut, location }) {
  return (
    <div style={{ height: "inherit" }}>
      <Header authUser={authUser} signOut={signOut} location={location} />
      <Body>{children}</Body>
      {!authUser && <Footer />}
    </div>
  );
}

export default PublicLayout;
