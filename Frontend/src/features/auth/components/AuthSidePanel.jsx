import React from "react";

const AuthSidePanel = ({ title, description }) => {
  return (
    <div className="auth__left">
      <div className="auth__blob auth__blob--one"></div>

      <div className="auth__blob auth__blob--two"></div>

      <div className="auth__blob auth__blob--three"></div>

      <div className="auth__content">
        <span className="auth__logo">TriNaad</span>

        <h1>{title}</h1>

        <p>{description}</p>
      </div>
    </div>
  );
};

export default AuthSidePanel;
