import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import KanbanTask from './KanbanTask';

const KanbanColumn = ({ column, tasks, index }) => {
  return (
    <Droppable droppableId={column.id} direction="vertical">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ margin: 8, border: '1px solid lightgrey', borderRadius: 4, width: 250, padding: 8, backgroundColor: '#f4f4f4' }}
        >
          <h3>{column.title}</h3>
          {tasks.map((task, index) => (
            <KanbanTask key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default KanbanColumn;
