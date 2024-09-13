import React from 'react';
import './PopupForm.css';

const PopupForm = ({ show, onClose, onSubmit, newTask, setNewTask, isEditMode }) => {
    if (!show) return null;

    const handlePriorityChange = (e) => {
        setNewTask({ ...newTask, priority: e.target.value });
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-form" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h3 className="popup-title">{isEditMode ? 'Edit Task' : 'Add New Task'}</h3>
                <form onSubmit={onSubmit} className="popup-form-container">
                    <div className="popup-input-container">
                        <label className="popup-input-label" htmlFor="task-title">Task Title</label>
                        <input
                            id="task-title"
                            type="text"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            placeholder="Task Title"
                            className="popup-input-field"
                            required
                        />
                    </div>
                    <div className="popup-input-container">
                        <label className="popup-input-label" htmlFor="task-description">Task Description</label>
                        <textarea
                            id="task-description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            placeholder="Task Description"
                            className="popup-input-field"
                            required
                        />
                    </div>
                    <div className="popup-input-container">
                        <label className="popup-input-label" htmlFor="task-priority">Priority</label>
                        <select
                            id="task-priority"
                            value={newTask.priority}
                            onChange={handlePriorityChange}
                            className="popup-input-field"
                            required
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="popup-buttons">
                        <button type="submit" className="popup-button"> {isEditMode ? 'Save Changes' : 'Submit'} </button>
                        <button type="button" className="popup-button popup-cancel-btn" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;
