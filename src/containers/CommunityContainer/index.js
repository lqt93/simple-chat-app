import React from "react";
import PrivateLayout from "../../components/layouts/Private";
import CommunityPage from "./components/Community";
import withCommunityHandler from "./handlers/withCommunity";

const Community = props => {
  return (
    <PrivateLayout {...props}>
      <CommunityPage {...props} />
    </PrivateLayout>
  );
};

export default withCommunityHandler(Community);
