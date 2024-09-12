import './home.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import mockData from './mockData';
import { useState } from 'react';
import Card from '../../Components/Card/Card';

const Home = () => {
    const [data, setData] = useState(mockData);
    const [newTask, setNewTask] = useState("");  // Add state to handle new task input

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

    const handleAddTask = (e, sectionId) => {
        e.preventDefault();
        if (!newTask.trim()) return;  // Prevent empty tasks

        const newData = data.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    tasks: [
                        ...section.tasks,
                        { id: Math.random().toString(), title: newTask }  // Add new task
                    ]
                };
            }
            return section;
        });

        setData(newData);
        setNewTask("");  // Clear the input field after submission
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
                                                                {task.title}
                                                            </Card>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                    <form onSubmit={(e) => handleAddTask(e, section.id)} className="add-task-form">
                                        <input
                                            type="text"
                                            value={newTask}
                                            onChange={(e) => setNewTask(e.target.value)}
                                            placeholder="Add new task"
                                            className="add-task-input"
                                        />
                                        <button type="submit" className="add-task-btn">Add Task</button>
                                    </form>
                                </div>
                            )}
                        </Droppable>
                    ))
                }
            </div>
        </DragDropContext>
    );
}

export default Home;
