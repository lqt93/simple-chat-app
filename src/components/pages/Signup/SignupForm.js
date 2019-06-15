import React from "react";

function SignupForm({
  submitNewUser,
  username,
  email,
  password,
  retypePassword,
  error,
  success
}) {
  return (
    <form className="signup-form" onSubmit={submitNewUser}>
      <div className="field-row txt-center">
        <strong>Register your account</strong>
      </div>
      <div className="signup-form__fields">
        <div className="field-row">
          <input
            defaultValue={username}
            name="username"
            placeholder="Username"
          />
        </div>
        <div
          className="field-row"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ width: "48%" }}>
            <input name="firstName" placeholder="First name" />
          </div>
          <div style={{ width: "48%" }}>
            <input name="lastName" placeholder="Last name" />
          </div>
        </div>
        <div className="field-row">
          <input defaultValue={email} name="email" placeholder="Email" />
        </div>
        <div className="field-row">
          <input
            defaultValue={password}
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="field-row">
          <input
            defaultValue={retypePassword}
            name="retypePassword"
            type="password"
            placeholder="Re-type password"
          />
        </div>
      </div>
      <div className="txt-center">
        <button className="btn-default">Submit</button>
      </div>
      {error && <div className="error-msg txt-center">{error}</div>}
      {success && <div className="success-msg txt-center">{success}</div>}
    </form>
  );
}

export default SignupForm;
