import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './KanbanBoard.css';
import TaskForm from '../../Components/TaskForm/TaskForm';

const initialData = {
  backlog: [],
  todo: [],
  inProgress: [],
  done: []
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialData);
  const [showForm, setShowForm] = useState(false);
  const [currentColumn, setCurrentColumn] = useState('');

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    if (sourceColumn === destinationColumn) {
      const updatedTasks = Array.from(tasks[sourceColumn]);
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [sourceColumn]: updatedTasks
      });
    } else {
      const sourceTasks = Array.from(tasks[sourceColumn]);
      const [movedTask] = sourceTasks.splice(source.index, 1);

      const destinationTasks = Array.from(tasks[destinationColumn]);
      destinationTasks.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [sourceColumn]: sourceTasks,
        [destinationColumn]: destinationTasks
      });
    }
  };

  const addTask = (column, task) => {
    setTasks({
      ...tasks,
      [column]: [...tasks[column], { id: Date.now(), ...task }]
    });
    setShowForm(false);
    setCurrentColumn('');
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-board">
          {Object.keys(tasks).map(column => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{column.charAt(0).toUpperCase() + column.slice(1)}</h2>
                  <button onClick={() => { setShowForm(true); setCurrentColumn(column); }}>
                    Add Task
                  </button>
                  {tasks[column].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          className="kanban-task"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {task.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {showForm && (
        <TaskForm
          onSave={(task) => addTask(currentColumn, task)}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
