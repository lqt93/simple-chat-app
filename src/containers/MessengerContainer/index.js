import React from "react";
import PrivateLayout from "../../components/layouts/Private";
import MessengerPage from "./components/Messenger";
import withMessengerHandler from "./handlers/withMessenger";
// css
import "./Messenger.css";

const Messenger = props => {
  return (
    <PrivateLayout {...props}>
      <MessengerPage {...props} />
    </PrivateLayout>
  );
};

export default withMessengerHandler(Messenger);
