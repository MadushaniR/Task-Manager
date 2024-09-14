import React from 'react';
import './input-field.css';

const InputField = ({ type, placeholder, icon, value, onChange, error, name }) => {
    return (
        <div className="input-field">
            <div className="input-container">
                {icon && <img src={icon} alt="icon" className="input-icon" />}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`input ${error ? 'error-input' : ''}`}
                    name={name}
                />
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default InputField;
