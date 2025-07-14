import { useDraggable } from '@dnd-kit/core';
import React from 'react';

import { cn } from '@/lib/utils.ts';

interface Props extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
  id: string;
  isDraggable?: boolean;
  overId?: string;
}

export const Draggable = ({ children, className, isDraggable, overId, id, ...props }: Props) => {
  const { attributes, listeners, isDragging, setNodeRef, transform } = useDraggable({
    id,
    data: { value: children, overId }
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
      }
    : undefined;

  return (
    <span
      ref={setNodeRef}
      className={cn({ 'opacity-40': isDragging && !isDraggable }, className)}
      style={isDraggable ? style : undefined}
      {...attributes}
      {...listeners}
      id={id}
      {...props}
    >
      {children}
    </span>
  );
};

Draggable.displayName = 'Draggable';
