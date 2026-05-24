import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {useAuth} from "../hooks/useAuth";

import "../styles/auth.scss";

import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import AuthSidePanel from "../components/AuthSidePanel";

const Login = () => {
  const {loading, handleLogin} = useAuth(); 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({username, email, password});
    navigate("/");
  };

  return (
    <main className="auth">
      <div className="auth__card">
        <AuthSidePanel
          title="Return To TriNaad"
          description="A sacred space where emotion, inner vision, and sound move as one."
        />

        <div className="auth__right">
          <div className="auth__form-box">
            <h2>Login</h2>

            <p>Enter your credentials to continue listening within</p>

            <form onSubmit={handleSubmit}>
              <AuthInput
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <AuthInput
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <AuthInput
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <AuthButton text="Login" />
            </form>

            <span className="auth__bottom-text">
              Don't have an account?
              <NavLink to="/register">Register</NavLink>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
