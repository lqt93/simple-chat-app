import React from "react";
import PubHomePage from "./components/PubHome";
import PublicLayout from "../../../components/layouts/Public";
import withPubHomeHandler from "./handlers/withPubHome";

const PubHome = props => {
  return (
    <PublicLayout authUser={props.authUser} signOut={props.signOut}>
      <PubHomePage {...props} />
    </PublicLayout>
  );
};

export default withPubHomeHandler(PubHome);
