import React from 'react';
import './form-container.css';

const FormContainer = ({ children, title }) => {
    return (
        <div className="form-container">
            <h2>{title}</h2>
            {children}
        </div>
    );
};

export default FormContainer;
