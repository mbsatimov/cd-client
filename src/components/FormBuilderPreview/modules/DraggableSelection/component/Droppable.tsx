import { useDroppable } from '@dnd-kit/core';
import React from 'react';

import { cn } from '@/lib/utils.ts';

interface Props extends Omit<React.ComponentProps<'span'>, 'id'> {
  children: React.ReactNode;
  id: string;
}

export const Droppable = ({ children, className, id, ...props }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <span
      ref={setNodeRef}
      className={cn({ 'bg-gray-500/20': isOver }, className)}
      id={id}
      {...props}
    >
      {children}
    </span>
  );
};
