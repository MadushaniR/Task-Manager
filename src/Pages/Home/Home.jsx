import './home.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import mockData from './mockData';
import { useState } from 'react';
import Card from '../../Components/Card/Card';
import PopupForm from '../../Components/PopupForm/PopupForm'; // Import the popup form component

const Home = () => {
    const [data, setData] = useState(mockData);
    const [showForm, setShowForm] = useState(false);  // Tracks if the form popup is shown
    const [currentSection, setCurrentSection] = useState(null); // Track the section where we are adding a task
    const [newTask, setNewTask] = useState({
        title: '',
        description: ''
    });

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = data.findIndex(e => e.id === source.droppableId);
            const destinationColIndex = data.findIndex(e => e.id === destination.droppableId);

            const sourceCol = data[sourceColIndex];
            const destinationCol = data[destinationColIndex];

            const sourceTask = [...sourceCol.tasks];
            const destinationTask = [...destinationCol.tasks];

            const [removed] = sourceTask.splice(source.index, 1);
            destinationTask.splice(destination.index, 0, removed);

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

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTask.title.trim() || !newTask.description.trim()) return;

        const newData = data.map(section => {
            if (section.id === currentSection) {
                return {
                    ...section,
                    tasks: [
                        ...section.tasks,
                        { id: Math.random().toString(), title: newTask.title, description: newTask.description }
                    ]
                };
            }
            return section;
        });

        setData(newData);
        setNewTask({ title: '', description: '' });
        setShowForm(false); // Close the popup
    };

    const openPopupForm = (sectionId) => {
        setCurrentSection(sectionId);
        setShowForm(true);  // Open the popup form
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban">
                {
                    data.map(section => (
                        <Droppable
                            key={section.id}
                            droppableId={section.id}
                        >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    className='kanban__section'
                                    ref={provided.innerRef}
                                >
                                    <div className="kanban__section__title">
                                        {section.title}
                                    </div>
                                    <div className="kanban__section__content">
                                        {
                                            section.tasks.map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id}
                                                    index={index}
                                                >
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
                                                                <strong>{task.title}</strong>
                                                                <p>{task.description}</p>
                                                            </Card>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                    {/* Button to trigger popup form */}
                                    <button
                                        className="add-task-btn"
                                        onClick={() => openPopupForm(section.id)}
                                    >
                                        Add New Task
                                    </button>
                                </div>
                            )}
                        </Droppable>
                    ))
                }
                {/* Popup Form */}
                <PopupForm
                    show={showForm}
                    onClose={() => setShowForm(false)}  // Close the popup when needed
                    onSubmit={handleAddTask}
                    newTask={newTask}
                    setNewTask={setNewTask}
                />
            </div>
        </DragDropContext>
    );
}

export default Home;
