import React from "react";
import PrivateLayout from "../../components/layouts/Private";
import FriendPage from "./components/Friend";
import withFriendHandler from "./handlers/withFriend";

const Friend = props => {
  return (
    <PrivateLayout {...props}>
      <FriendPage {...props} />
    </PrivateLayout>
  );
};

export default withFriendHandler(Friend);
