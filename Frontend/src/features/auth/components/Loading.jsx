import React from "react";
import "../styles/auth.scss";

const Loading = ({
  size = "default",
  center = false,
  main = false,
  text,
  colors = ["#7c3aed", "#06b6d4", "#f472b6"],
}) => {
  const wrapperClasses = [
    "loader-shell",
    center ? "loader-shell--center" : "",
    main ? "loader-shell--main" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const loaderClasses = [
    "loader",
    `loader--${size}`,
    main ? "loader--main" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const loaderText = text ?? (main ? "Loading your vibe..." : "Loading...");
  const [colorOne, colorTwo, colorThree] = colors;

  return (
    <div
      className={wrapperClasses}
      style={{
        "--loader-color-one": colorOne,
        "--loader-color-two": colorTwo,
        "--loader-color-three": colorThree ?? colorTwo,
      }}
      role="status"
      aria-live="polite"
    >
      <div className={loaderClasses}>
        <span className="loader__orb loader__orb--one"></span>
        <span className="loader__orb loader__orb--two"></span>
        <span className="loader__ring"></span>
        <span className="loader__core"></span>
      </div>
      {main ? <p className="loader__text">{loaderText}</p> : null}
    </div>
  );
};

export default Loading;
