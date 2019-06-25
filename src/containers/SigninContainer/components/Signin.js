import React from "react";

function SigninPage({ handleChange, submit, email, password }) {
  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className="signin-box__title">
          <strong>Sign in to SimpleChat</strong>
        </div>
        <form className="signin-box__form">
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="btn-default" type="submit" onClick={submit}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;
