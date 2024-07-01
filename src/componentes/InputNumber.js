import React from 'react';

const InputNumber = ({ value, onChange, required = false, step }) => {
  return (
    <input
      type="number"
      step={step}
      className="form-control"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default InputNumber;
