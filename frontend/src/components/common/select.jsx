import React from "react";
import "./select.css";

const Select = ({ name, values, onChange, placeholder }) => {
  return (
    <select name={name} onChange={onChange} className="select">
      <option value="" className="option">
        {placeholder}
      </option>
      {values.map((value) => (
        <option className="option" key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Select;
