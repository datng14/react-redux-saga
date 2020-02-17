import React from "react";

const Picker = ({ value, options, onChange }) => {
  return (
    <span>
      <h2>{value}</h2>
      <select onChange={e => onChange(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </span>
  );
};

export default Picker;
