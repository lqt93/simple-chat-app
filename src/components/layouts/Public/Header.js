import React from "react";
import { Link } from "react-router-dom";

function Header({ authUser, location, signOut }) {
  return (
    <header>
      <div className="container container--header">
        <div className="brand">
          <nav>
            <Link to="/">
              <strong>SimpleChat</strong>
            </Link>
          </nav>
        </div>
        {!authUser &&
          (location.pathname === "/" || location.pathname === "/signup") && (
            <div className="navbar">
              <Link to="/signin">
                <button className="btn-outlined--primary">
                  <strong>Sign in</strong>
                </button>
              </Link>
            </div>
          )}
        {!authUser && location.pathname === "/signin" && (
          <div className="navbar">
            <Link to="/signup">
              <button className="btn-sub">
                <strong>Sign up</strong>
              </button>
            </Link>
          </div>
        )}
        {authUser && (
          <div className="navbar">
            <nav onClick={signOut}>Sign out</nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
