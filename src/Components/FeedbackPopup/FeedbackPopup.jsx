import React from 'react';
import './feedback-popup.css';

const FeedbackPopup = ({ message, type, onClose }) => {
    if (!message) return null;

    const getImage = () => {
        return type === 'success' ? 'success.png' : 'failed.png';
    };

    return (
        <div className={`popup-overlay ${type}`}>
            <div className="popup-content">
                <span className="popup-close-icon" onClick={onClose}>&times;</span>
                <img
                    src={require(`../../assets/${getImage()}`)}
                    alt={type === 'success' ? 'Success' : 'Error'}
                    className="feedback-img"
                />
                <div className="feedback-msg">{message}</div>
                <button onClick={onClose} className="popup-close-btn">Close</button>
            </div>
        </div>
    );
};

export default FeedbackPopup;
