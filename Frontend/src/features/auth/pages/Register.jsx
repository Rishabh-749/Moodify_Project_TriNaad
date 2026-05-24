import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {useAuth} from "../hooks/useAuth";

import "../styles/auth.scss";

import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import AuthSidePanel from "../components/AuthSidePanel";

const Register = () => {
  const {loading, handleRegister} = useAuth(); 
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({username, email, password});
    navigate("/");
  };

  return (
    <main className="auth">
      <div className="auth__card">
        <AuthSidePanel
          title="Open The Inner Sound"
          description="Where Emotion Becomes Sound"
        />

        <div className="auth__right">
          <div className="auth__form-box">
            <h2>Register</h2>

            <p>Begin your TriNaad journey</p>

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

              <AuthButton text="Create Account" />
            </form>

            <span className="auth__bottom-text">
              Already have an account?
              <NavLink to="/login">Login</NavLink>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
