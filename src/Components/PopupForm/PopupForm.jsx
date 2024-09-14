import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './PopupForm.css';

const validationSchema = Yup.object({
    title: Yup.string().required('Task title is required'),
    description: Yup.string().required('Task description is required'),
    priority: Yup.string().oneOf(['low', 'medium', 'high'], 'Invalid priority').required('Priority is required'),
});

const PopupForm = ({ show, onClose, onSubmit, newTask, setNewTask, isEditMode }) => {
    if (!show) return null;

    const initialValues = {
        title: newTask.title || '',
        description: newTask.description || '',
        priority: newTask.priority || 'low',
    };

    const handleSubmit = (values, { resetForm }) => {
        onSubmit(values);
        resetForm();
        onClose();
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-form" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="close-button" onClick={onClose}>&times;</button>
                <h3 className="popup-title">{isEditMode ? 'Edit Task' : 'Add New Task'}</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="popup-form-container">
                            <div className="popup-input-container">
                                <label className="popup-input-label" htmlFor="title">Task Title</label>
                                <Field
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Task Title"
                                    className="popup-input-field"
                                />
                                <ErrorMessage name="title" component="div" className="error-message" />
                            </div>
                            <div className="popup-input-container">
                                <label className="popup-input-label" htmlFor="description">Task Description</label>
                                <Field
                                    id="description"
                                    name="description"
                                    as="textarea"
                                    placeholder="Task Description"
                                    className="popup-input-field"
                                />
                                <ErrorMessage name="description" component="div" className="error-message" />
                            </div>
                            <div className="popup-input-container">
                                <label className="popup-input-label" htmlFor="priority">Priority</label>
                                <Field
                                    id="priority"
                                    name="priority"
                                    as="select"
                                    className="popup-input-field"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </Field>
                                <ErrorMessage name="priority" component="div" className="error-message" />
                            </div>
                            <div className="popup-buttons">
                                <button type="submit" className="popup-button" disabled={isSubmitting}>
                                    {isEditMode ? 'Save' : 'Submit'}
                                </button>
                                <button type="button" className="popup-button popup-cancel-btn" onClick={onClose}>
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PopupForm;
