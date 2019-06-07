import React from "react";
import { Link } from "react-router-dom";

function Header({ authUser, signOut }) {
  return (
    <header>
      <div className="container">
        <div className="brand">
          <nav>
            <Link to="/">
              <strong>SimpleChat</strong>
            </Link>
          </nav>
        </div>
        <div className="navbar">
          {!authUser && (
            <nav>
              <Link to="/signin">Sign in</Link>
            </nav>
          )}
          {authUser && (
            <nav>
              Welcome, <Link> {authUser.fullName} </Link>
            </nav>
          )}
          {authUser && <nav onClick={signOut}>Sign out</nav>}
        </div>
      </div>
    </header>
  );
}

export default Header;
