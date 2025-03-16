import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { ReactNode } from 'react';

interface SortableItemProps {
  id: string | number;
  children: ReactNode;
  'data-column-id'?: string;
  'data-column-status'?: string;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children, 'data-column-id': columnId, 'data-column-status': columnStatus }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ 
    id,
    data: {
      // Include data about which column this task belongs to
      columnId,
      columnStatus,
      type: 'task'
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableItem; 