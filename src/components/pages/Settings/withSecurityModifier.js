import React from "react";
import request from "../../../utils/request";

const allowedFields = {
  oldPassword: "old password",
  newPassword: "new password",
  confirmPassword: "confirm-password"
};

const INITIAL_STATE = {
  isSaving: false,
  success: null,
  error: null
};

const withSecurityModifier = Security =>
  class SecurityModifier extends React.PureComponent {
    state = { ...INITIAL_STATE };
    onSubmit = async e => {
      e.preventDefault();

      let submitObj = {};

      for (let field in allowedFields) {
        console.log("field", field);
        submitObj[field] = e.target[field].value.trim();
        if (field !== "confirmPassword" && !submitObj[field])
          return this.setError(`Missing ${allowedFields[field]}`);
      }

      if (submitObj.newPassword === submitObj.oldPassword)
        return this.setError(
          "New password should be different from old password"
        );

      if (submitObj.newPassword.length < 6)
        return this.setError("Password should have more than 6 characters");

      if (!submitObj.confirmPassword)
        return this.setError("Missing confirm-password");

      if (submitObj.newPassword !== submitObj.confirmPassword)
        return this.setError("Confirm password does not match");

      this.setState({ ...INITIAL_STATE, isSaving: true });

      try {
        const response = await request({
          url: "/users/password_change",
          method: "PUT",
          data: submitObj
        });
        if (response.status === 200 && response.data.status === "success") {
          this.saveSuccess("Saved");
        }
      } catch (err) {
        this.setError(err.response.data.message);
      }
    };
    setError(msg) {
      this.setState({
        ...INITIAL_STATE,
        error: msg || "Error"
      });
    }
    saveSuccess(msg) {
      this.setState({
        ...INITIAL_STATE,
        success: msg
      });
    }
    render() {
      return (
        <Security {...this.state} {...this.props} onSubmit={this.onSubmit} />
      );
    }
  };

export default withSecurityModifier;
