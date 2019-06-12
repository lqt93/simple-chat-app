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
      <div className="signup-form__row txt-center">
        <strong>Register your account</strong>
      </div>
      <div className="signup-form__row signup-form__grid">
        <label>Username</label>
        <div>
          <input value={username} name="username" />
        </div>
        <label>Email</label>
        <div>
          <input value={email} name="email" />
        </div>
        <label>Password</label>
        <div>
          <input value={password} name="password" type="password" />
        </div>
        <label>Re-type Password</label>
        <div>
          <input value={retypePassword} name="retypePassword" type="password" />
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
