import React from "react";
import "./input.css";

const Input = ({ type, name, value, placeholder, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      className="login-form__input"
      onChange={onChange}
    />
  );
};

export default Input;
