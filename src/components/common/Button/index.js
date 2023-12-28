import React from "react";
import "./styles.css";
const Button = ({ text, onClick, disabled, type, style }) => {
  // return <div onClick={onClick} className="custom-btn" disabled={disabled}>{text}</div>;
  return (
    <button
      onClick={onClick}
      className="custom-btn"
      disabled={disabled}
      type={type}
      style={style}
    >
      {text}
    </button>
  );
};

export default Button;
