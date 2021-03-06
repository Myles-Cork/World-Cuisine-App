//Based on: https://blog.logrocket.com/user-authentication-firebase-react-apps/

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseAdapter from "../../adapters/FirebaseAdapter";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(FirebaseAdapter.getAuth());
  const navigate = useNavigate();
  if (user){
      console.log(`User: ${user.uid}`);
  }
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home/search");
  }, [user, loading]);
  return (
    <div className="login">
      <form className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          className="login__btn"
          onClick={(event) => {
            event.preventDefault();
            FirebaseAdapter.logInWithEmailAndPassword(email, password);
          }}
        >
          Login
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </form>
    </div>
  );
}
export default Login;
