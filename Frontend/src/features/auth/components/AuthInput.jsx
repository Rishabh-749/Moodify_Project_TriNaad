import React from "react";

const AuthInput = ({
  type,
  label,
  value,
  onChange,
}) => {
  return (
    <div className="auth__group">

      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        className="auth__input"
      />

      <label className="auth__label">
        {label}
      </label>

    </div>
  );
};

export default AuthInput;