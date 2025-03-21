'use client';

import * as React from 'react';

import { cn, mergeRefs } from '@/lib/utils.ts';

import { Textarea } from './textarea';

interface Props extends React.ComponentProps<typeof Textarea> {
  defaultRows?: number;
  maxRows?: number;
}

const AutoGrowingTextarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, defaultRows = 1, onChange, maxRows, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target;
      textarea.style.height = 'auto';

      const style = window.getComputedStyle(textarea);
      const borderHeight =
        Number.parseInt(style.borderTopWidth) + Number.parseInt(style.borderBottomWidth);
      const paddingHeight =
        Number.parseInt(style.paddingTop) + Number.parseInt(style.paddingBottom);

      const lineHeight = Number.parseInt(style.lineHeight);
      const maxHeight = maxRows ? lineHeight * maxRows + borderHeight + paddingHeight : Infinity;

      const newHeight = Math.min(textarea.scrollHeight + borderHeight, maxHeight);

      textarea.style.height = `${newHeight}px`;
    };

    return (
      <Textarea
        ref={mergeRefs(textareaRef, ref)}
        className={cn('min-h-[none] resize-none', className)}
        onChange={(e) => {
          handleInput(e);
          onChange?.(e);
        }}
        placeholder='Leave a comment'
        rows={defaultRows}
        {...props}
      />
    );
  }
);
AutoGrowingTextarea.displayName = 'AutoGrowingTextarea';

export { AutoGrowingTextarea };
