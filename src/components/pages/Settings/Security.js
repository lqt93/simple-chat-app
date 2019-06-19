import React from "react";
import ProcessMsg from "../../../components/common/ProcessMsg";
import withSecurityModifier from "./withSecurityModifier";

const Security = ({ onSubmit, error, success, isSaving }) => {
  return (
    <form className="security-form" onSubmit={onSubmit}>
      <div className="security-form__row">
        <label>Old password</label>
        <input type="password" name="oldPassword" />
      </div>
      <div className="security-form__row">
        <label>New password</label>
        <input type="password" name="newPassword" />
      </div>
      <div className="security-form__row">
        <label>Confirm new password</label>
        <input type="password" name="confirmPassword" />
      </div>
      <div className="txt-center">
        <button
          className={`btn-default ${isSaving && "btn-disabled"}`}
          type="submit"
          disabled={isSaving}
        >
          Update password
        </button>
      </div>
      <ProcessMsg isLoading={isSaving} error={error} success={success} />
    </form>
  );
};

export default withSecurityModifier(Security);
