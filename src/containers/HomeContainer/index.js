import React from "react";
import AuthHomeContainer from "./AuthHomeContainer";
import PubHomeContainer from "./PubHomeContainer";
// css
import "./Home.css";

function HomeContainer(props) {
  return (
    <React.Fragment>
      {props.authUser && <AuthHomeContainer {...props} />}
      {!props.authUser && <PubHomeContainer {...props} />}
    </React.Fragment>
  );
}

export default HomeContainer;
