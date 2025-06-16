import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

interface Props extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
  id: string;
  overId?: string;
}

export const Draggable = ({ children, overId, id, ...props }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { value: children, overId }
  });

  return (
    <span
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform) }}
      {...attributes}
      {...listeners}
      {...props}
    >
      {children}
    </span>
  );
};

Draggable.displayName = 'Draggable';
