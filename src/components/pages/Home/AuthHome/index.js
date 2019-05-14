import React from "react";

function AuthHome({ authUser }) {
  return (
    <div>
      <h3>Welcome {authUser.fullName ? `${authUser.fullName},` : ","}</h3>Auth
      Home Page
    </div>
  );
}

export default AuthHome;
