import React from "react";
import withProfileEditor from "./withProfileEditor";
import ProcessMsg from "../../../components/common/ProcessMsg";

function ProfileInfo({ authUser, isSaving, onSubmit, error, success }) {
  return (
    <form className="profile-form" onSubmit={onSubmit}>
      <div className="profile-form__row">
        <label>Username</label>
        <input defaultValue={authUser.username || ""} name="username" />
      </div>
      <div className="profile-form__row">
        <label>First name</label>
        <input defaultValue={authUser.firstName || ""} name="firstName" />
      </div>
      <div className="profile-form__row">
        <label>Last name</label>
        <input defaultValue={authUser.lastName || ""} name="lastName" />
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          className={`btn-default ${isSaving && "btn-disabled"}`}
          type="submit"
          disabled={isSaving}
        >
          Save
        </button>
      </div>
      <ProcessMsg isLoading={isSaving} error={error} success={success} />
    </form>
  );
}

export default withProfileEditor(ProfileInfo);
