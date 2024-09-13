import React from 'react';
import './help.css';
import Nav from '../../Components/NavigationBar/Nav';

const HelpPage = () => {
    return (
        <div className="help-wrapper">
            <Nav />
            <div className="help-page">
                <h1>Help & Instructions</h1>
                <div className="grid-container">
                    <div className="grid-item create-task">
                        <h2>Create a Task</h2>
                        <p>
                            Click the "Add Task" button to open the task creation form. Enter the task details and click "Submit" to add it to your list.
                        </p>
                    </div>
                    <div className="grid-item edit-task">
                        <h2>Edit a Task</h2>
                        <p>
                            To modify an existing task, click the "Edit" button next to the task. Update the task details in the form and click "Save" to apply the changes.
                        </p>
                    </div>
                    <div className="grid-item delete-task">
                        <h2>Delete a Task</h2>
                        <p>
                            Click the "Delete" button next to the task you wish to remove. Confirm the deletion in the prompt that appears.
                        </p>
                    </div>
                    <div className="grid-item mark-tasks">
                        <h2>Change the Task Status</h2>
                        <p>
                            Organize your tasks by dragging and dropping them into different categories: Todo, In Progress, Review, and Completed. This helps you keep track of the status and progress of each task.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
