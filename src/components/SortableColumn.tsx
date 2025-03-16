import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Column from './Column';
import { Column as ColumnType, Task } from '../types/types';

interface SortableColumnProps {
  id: string;
  column: ColumnType;
  tasks: Task[];
}

const SortableColumn: React.FC<SortableColumnProps> = ({ id, column, tasks }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id,
    data: {
      type: 'column',
      column,
    }
  });

  // Filter tasks for this column to determine if it's empty
  const columnTasks = tasks.filter((task: Task) => task.status === column.status);
  const isEmpty = columnTasks.length === 0;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    position: 'relative' as const,
    height: 'auto', // Allow dynamic height
    alignSelf: isEmpty ? 'flex-start' : 'stretch',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Column column={column} tasks={tasks} />
    </div>
  );
};

export default SortableColumn; 