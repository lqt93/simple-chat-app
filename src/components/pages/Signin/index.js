import React from "react";
import Wrapper from "./Wrapper";

function SigninPage({ handleChange, submit, email, password }) {
  return (
    <Wrapper>
      <div>
        <b>Sign in to Chat app</b>
      </div>
      <form>
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
          <button type="submit" onClick={submit}>
            Submit
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default SigninPage;
