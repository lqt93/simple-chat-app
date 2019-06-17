import React from "react";
import request from "../../../utils/request";

const allowedFields = ["username", "firstName", "lastName"];

const INITIAL_STATE = {
  isSaving: false,
  success: null,
  error: null
};

const withProfileEditor = ProfileInfo =>
  class ProfileEditor extends React.PureComponent {
    state = { ...INITIAL_STATE };
    onSubmit = async e => {
      e.preventDefault();
      let submitObj = {};
      const { authUser } = this.props;
      allowedFields.forEach(field => {
        const newValue = e.target[field].value.trim();
        if (newValue && newValue !== authUser[field])
          submitObj[field] = newValue;
      });

      this.setState({ ...INITIAL_STATE, isSaving: true });

      if (Object.keys(submitObj).length === 0)
        return this.setState({ ...INITIAL_STATE });

      try {
        const response = await request({
          url: "/users/profile",
          method: "PUT",
          data: submitObj
        });
        if (response.status === 200 && response.data.status === "success") {
          this.saveSuccess("Saved");
          this.props.setAuthValue("authUser", response.data.value);
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
        <ProfileInfo {...this.state} {...this.props} onSubmit={this.onSubmit} />
      );
    }
  };

export default withProfileEditor;
