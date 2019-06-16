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
              <nav>
                <Link to="/signin">Sign in</Link>
              </nav>
            </div>
          )}
        {!authUser && location.pathname === "/signin" && (
          <div className="navbar">
            <nav>
              <Link to="/signup">Sign up</Link>
            </nav>
          </div>
        )}
        {authUser && (
          <div className="navbar">
            <nav>
              Welcome{" "}
              <Link to="/settings">
                {authUser.fullName && authUser.fullName.indexOf("undefined") < 0
                  ? authUser.fullName
                  : authUser.username || authUser.email}
              </Link>
            </nav>
            <nav onClick={signOut}>Sign out</nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
