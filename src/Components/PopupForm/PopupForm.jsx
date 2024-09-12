import React from 'react';
import './PopupForm.css';

const PopupForm = ({ show, onClose, onSubmit, newTask, setNewTask, isEditMode }) => {
    if (!show) return null;

    return (
        <div className="popup-form-overlay">
            <div className="popup-form">
                <h3>{isEditMode ? 'Edit Task' : 'Add New Task'}</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        placeholder="Task Title"
                        className="popup-form-input"
                        required
                    />
                    <textarea
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        placeholder="Task Description"
                        className="popup-form-input"
                        required
                    />
                    <div className="popup-form-buttons">
                        <button type="submit" className="popup-form-submit-btn">
                            {isEditMode ? 'Save Changes' : 'Submit'}
                        </button>
                        <button type="button" className="popup-form-close-btn" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;
