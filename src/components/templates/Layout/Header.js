import React from "react";
import { Link } from "react-router-dom";

function Header({ authUser, signOut }) {
  return (
    <header>
      <span>
        <Link to="/">
          <b>Chat App</b>
        </Link>
      </span>
      {!authUser && (
        <span style={{ marginLeft: 20 }}>
          <Link to="/signin">Sign in</Link>
        </span>
      )}
      {authUser && (
        <span style={{ marginLeft: 20 }}>
          <button
            onClick={signOut}
            style={{
              border: "none",
              backgroundColor: "inherit",
              fontSize: 16,
              cursor: "pointer",
              display: "inline-block"
            }}
          >
            Sign out
          </button>
        </span>
      )}
    </header>
  );
}

export default Header;
