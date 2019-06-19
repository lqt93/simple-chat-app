import React from "react";
import Menu from "./Menu";
import ProfileInfo from "./ProfileInfo";
import Security from "./Security";
import "./Settings.css";

function SettingPage({ currentTab, authUser, setAuthValue }) {
  return (
    <div className="settings-wrapper">
      <div className="settings-container">
        <Menu currentTab={currentTab} />
        <div className="settings-tab-container">
          {currentTab === "Profile" && (
            <ProfileInfo authUser={authUser} setAuthValue={setAuthValue} />
          )}
          {currentTab === "Security" && <Security />}
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
