import React from "react";
import "./ProcessMsg.css";

function ProcessMsg({ error, success, loadingDisplay, isLoading }) {
  return (
    <div className="process-msg">
      {error && (
        <div className="process-msg__item process-msg__error">{error}</div>
      )}
      {success && (
        <div className="process-msg__item process-msg__success">{success}</div>
      )}
      {isLoading && (
        <div className="process-msg__item process-msg__loading">
          {loadingDisplay}
        </div>
      )}
    </div>
  );
}

ProcessMsg.defaultProps = {
  error: null,
  success: null,
  loadingDisplay: "...loading"
};

export default ProcessMsg;
