import { CSS } from '@dnd-kit/utilities';
import React from 'react';

import { cn } from '@/lib/utils';

interface ItemProps {
  dragging?: boolean;
  dragOverlay?: boolean;
  listeners?: any;
  style?: React.CSSProperties;
  taskId?: string;
  transform?: any;
  transition?: string;
  value: React.ReactNode;
}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  (
    { taskId, dragOverlay, dragging, listeners, style, transition, transform, value, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          zIndex: dragOverlay ? 999 : undefined,
          ...style
        }}
        className='w-full justify-self-center origin-top-left touch-manipulation'
      >
        <div
          className={cn(
            'relative flex h-8 w-full items-center justify-between rounded-sm px-3 outline-none',
            'cursor-grab bg-background/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'shadow-sm',
            dragOverlay && 'animate-in zoom-in-105 duration-200',
            dragging && 'opacity-25'
          )}
          tabIndex={0}
          {...listeners}
          {...props}
        >
          {value}
        </div>
      </div>
    );
  }
);

Item.displayName = 'Item';
