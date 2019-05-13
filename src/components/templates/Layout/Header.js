import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <span>
        <Link to="/">
          <b>Chat App</b>
        </Link>
      </span>
      <span style={{ marginLeft: 20 }}>
        <Link to="/signin">Sign in</Link>
      </span>
    </header>
  );
}

export default Header;
