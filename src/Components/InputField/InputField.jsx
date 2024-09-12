import React from 'react';
import './input-field.css';

const InputField = ({ type, placeholder, icon, value, onChange }) => {
    return (
        <div className="input-field">
            {icon && <img src={icon} alt="icon" className="input-icon" />}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="input"
            />
        </div>
    );
};

export default InputField;
