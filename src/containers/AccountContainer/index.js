import React from "react";
import PrivateLayout from "../../components/layouts/Private";
import AccountPage from "./components/Account";
import withAccountHandler from "./handlers/withAccount";
import "./Account.css";

const Account = props => {
  return (
    <PrivateLayout {...props}>
      <AccountPage {...props} />
    </PrivateLayout>
  );
};

export default withAccountHandler(Account);
