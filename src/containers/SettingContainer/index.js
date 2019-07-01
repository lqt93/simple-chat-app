import React from "react";
import PrivateLayout from "../../components/layouts/Private";
import SettingPage from "./components/Setting";
import withSettingHandler from "./handlers/withSetting";
import "./Setting.css";

const Setting = props => {
  return (
    <PrivateLayout {...props}>
      <SettingPage {...props} />
    </PrivateLayout>
  );
};

export default withSettingHandler(Setting);
