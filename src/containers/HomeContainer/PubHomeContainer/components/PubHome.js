import React from "react";
import { Link } from "react-router-dom";

function PubHome() {
  return (
    <div className="container container--deeper">
      <div className="pub-home-container">
        <h1> Welcome to SimpleChat </h1>
        <h3>
          <Link to="/signup">Create your account</Link> to explore our typing
          world
        </h3>
      </div>
    </div>
  );
}

export default PubHome;
