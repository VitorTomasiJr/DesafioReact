import React from 'react';

const InputText = ({ value, onChange, required = false }) => {
    return (
        <input
            type="text"
            className="form-control"
            value={value}
            onChange={onChange}
            required={required} 
        />
    );
};

export default InputText;
