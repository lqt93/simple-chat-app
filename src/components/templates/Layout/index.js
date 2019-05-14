import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

function Layout({ children, authUser, signOut }) {
  return (
    <div>
      <Header authUser={authUser} signOut={signOut} />
      <Body>{children}</Body>
      <Footer />
    </div>
  );
}

export default Layout;
