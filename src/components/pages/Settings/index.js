import React from "react";
import Menu from "./Menu";
import ProfileInfo from "./ProfileInfo";
import "./Settings.css";

function SettingPage({ currentTab }) {
  return (
    <div className="settings-wrapper">
      <div className="settings-container">
        <Menu currentTab={currentTab} />
        <div className="settings-tab-container">
          <ProfileInfo />
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
