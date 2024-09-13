import React from 'react';
import './feedback-popup.css';

const FeedbackPopup = ({ message, type, onClose }) => {
    if (!message) return null;

    return (
        <div className={`popup-overlay ${type}`}>
            <div className="popup-content">
                <div className="feedback-msg">{message}</div>
                <button onClick={onClose} className="popup-close-btn">Close</button>
            </div>
        </div>
    );
};

export default FeedbackPopup;
