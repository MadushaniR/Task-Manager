import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (title) {
      onSave({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-modal">
        <h3>Add New Task</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="task-form-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
