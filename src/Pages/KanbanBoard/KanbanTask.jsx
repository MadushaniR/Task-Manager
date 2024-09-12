import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const KanbanTask = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ padding: 8, margin: '0 0 8px 0', border: '1px solid lightgrey', borderRadius: 4, backgroundColor: 'white', ...provided.draggableProps.style }}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default KanbanTask;
