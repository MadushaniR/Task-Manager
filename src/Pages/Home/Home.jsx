import './home.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import mockData from './mockData';
import { useState } from 'react';
import Card from '../../Components/Card/Card';
import PopupForm from '../../Components/PopupForm/PopupForm';
import Nav from '../../Components/NavigationBar/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [data, setData] = useState(mockData);
    const [showForm, setShowForm] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'low'
    });

    // function to handle drag and drop of tasks
    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            // find source and destination columns
            const sourceColIndex = data.findIndex(e => e.id === source.droppableId);
            const destinationColIndex = data.findIndex(e => e.id === destination.droppableId);

            const sourceCol = data[sourceColIndex];
            const destinationCol = data[destinationColIndex];

            const sourceTask = [...sourceCol.tasks];
            const destinationTask = [...destinationCol.tasks];

            // move task from source to destination
            const [removed] = sourceTask.splice(source.index, 1);
            destinationTask.splice(destination.index, 0, removed);

            // update state with new task positions
            const newData = [...data];
            newData[sourceColIndex] = {
                ...sourceCol,
                tasks: sourceTask
            };
            newData[destinationColIndex] = {
                ...destinationCol,
                tasks: destinationTask
            };

            setData(newData);
        }
    };

    // function to handle adding a new task
    const handleAddTask = (values) => {
        if (!values.title.trim() || !values.description.trim()) return;

        const newData = data.map(section => {
            if (section.id === currentSection) {
                return {
                    ...section,
                    tasks: [
                        ...section.tasks,
                        { id: Math.random().toString(), title: values.title, description: values.description, priority: values.priority }
                    ]
                };
            }
            return section;
        });

        setData(newData);
        resetForm();
    };

    // function to handle editing an existing task
    const handleEditTask = (values) => {
        const newData = data.map(section => {
            if (section.id === currentSection) {
                return {
                    ...section,
                    tasks: section.tasks.map(task =>
                        task.id === editingTask.id ? { ...task, title: values.title, description: values.description, priority: values.priority } : task
                    )
                };
            }
            return section;
        });

        setData(newData);
        resetForm();
    };

    // function to reset the form and state
    const resetForm = () => {
        setNewTask({ title: '', description: '', priority: 'low' });
        setEditingTask(null);
        setShowForm(false);
        setIsEditMode(false);
    };

    // function to open the popup form for adding a new task
    const openPopupForm = (sectionId) => {
        setCurrentSection(sectionId);
        setShowForm(true);
        setIsEditMode(false);
    };

    // function to open the popup form for editing an existing task
    const openEditForm = (task, sectionId) => {
        setCurrentSection(sectionId);
        setEditingTask(task);
        setNewTask({ title: task.title, description: task.description, priority: task.priority });
        setShowForm(true);
        setIsEditMode(true);
    };

    // function to handle task deletion
    const handleDeleteTask = (taskId, sectionId) => {
        const newData = data.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    tasks: section.tasks.filter(task => task.id !== taskId)
                };
            }
            return section;
        });

        setData(newData);
    };

    // function to get the count of tasks in a section
    const getTaskCount = (sectionId) => {
        const section = data.find(section => section.id === sectionId);
        return section ? section.tasks.length : 0;
    };

    // function to get the CSS class for task priority
    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high':
                return 'priority-tag high';
            case 'medium':
                return 'priority-tag medium';
            case 'low':
                return 'priority-tag low';
            default:
                return '';
        }
    };

    return (
        <>
            <Nav />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="kanban">
                    {data.map(section => (
                        <Droppable key={section.id} droppableId={section.id}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    className='kanban__section'
                                    ref={provided.innerRef}
                                >
                                    <div className="kanban__section__title">
                                        {section.title}
                                        <span className="task-count">({getTaskCount(section.id)})</span>
                                    </div>
                                    <div className="kanban__section__content">
                                        {section.tasks.map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            opacity: snapshot.isDragging ? '0.5' : '1'
                                                        }}
                                                    >
                                                        <Card>
                                                            <div className="task-header">
                                                                <div className="task-title">{task.title}</div>
                                                                <span className={getPriorityClass(task.priority)}>
                                                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                                                </span>
                                                            </div>
                                                            <div className="task-des">{task.description}</div>
                                                            <button
                                                                type="button"
                                                                className="edit-task-btn"
                                                                onClick={() => openEditForm(task, section.id)}
                                                            >
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="delete-task-btn"
                                                                onClick={() => handleDeleteTask(task.id, section.id)}
                                                            >
                                                                <FontAwesomeIcon icon={faTrashAlt} />
                                                            </button>
                                                        </Card>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                    <button
                                        type="button"
                                        className="add-task-btn"
                                        onClick={() => openPopupForm(section.id)}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            )}
                        </Droppable>
                    ))}
                    <PopupForm
                        show={showForm}
                        onClose={resetForm}
                        onSubmit={isEditMode ? handleEditTask : handleAddTask}
                        newTask={newTask}
                        setNewTask={setNewTask}
                        isEditMode={isEditMode}
                    />
                </div>
            </DragDropContext>
        </>
    );
};

export default Home;
