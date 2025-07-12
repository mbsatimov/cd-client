import { DeleteIcon, NotebookIcon, Trash2Icon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button.tsx';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';

import { useHighlightable } from './hooks';

interface HighlightableProps {
  children: React.ReactNode;
}

export const Highlightable: React.FC<HighlightableProps> = ({ children }) => {
  const { state, functions } = useHighlightable();

  return (
    <>
      {state.selection && state.position && (
        <p
          style={{
            transform: `translate3d(${state.position.x}px, ${state.position.y}px, 0)`
          }}
          className='absolute -top-2 left-0 m-0 h-[30px] rounded bg-background text-foreground shadow-md after:absolute after:left-1/2 after:top-full after:h-0 after:w-0 after:-translate-x-2 after:rotate-180 after:border-x-[6px] after:border-b-[8px] after:border-x-transparent after:border-b-primary'
        >
          <Button
            className='flex h-full w-full items-center justify-between px-3 py-1'
            onClick={functions.handleHighlight}
          >
            Highlight
          </Button>
        </p>
      )}
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            ref={state.containerRef}
            className='select-text'
            onContextMenu={functions.handleContextMenu}
          >
            {children}
          </div>
        </ContextMenuTrigger>
        {!state.selection && (
          <ContextMenuContent className='w-48'>
            {state.rightClickedMark ? (
              <>
                <ContextMenuItem onClick={(e) => functions.showPopover(e.clientX, e.clientY)}>
                  <NotebookIcon className='mr-2 h-4 w-4' />
                  Notes
                </ContextMenuItem>
                <ContextMenuItem onClick={functions.handleClearHighlight}>
                  <DeleteIcon className='mr-2 h-4 w-4' />
                  Clear
                </ContextMenuItem>
                <ContextMenuItem onClick={functions.handleClearAllHighlights}>
                  <Trash2Icon className='mr-2 h-4 w-4' />
                  Clear All
                </ContextMenuItem>
              </>
            ) : null}
          </ContextMenuContent>
        )}
      </ContextMenu>
      {/* Custom Popover for Notes */}
      {state.popoverPosition && (
        <div
          style={{
            top: state.popoverPosition.top,
            left: state.popoverPosition.left,
            maxWidth: state.popoverPosition.maxWidth
              ? `${state.popoverPosition.maxWidth}px`
              : undefined,
            maxHeight: state.popoverPosition.maxHeight
              ? `${state.popoverPosition.maxHeight}px`
              : undefined
          }}
          className='fixed z-50 w-64 overflow-hidden rounded-lg border bg-background p-4 shadow-lg animate-in fade-in-0 zoom-in-95'
        >
          <h3 className='mb-2 text-sm font-semibold'>Add Note</h3>
          <Textarea
            style={{
              height: state.popoverPosition.maxHeight
                ? `${Math.max(60, state.popoverPosition.maxHeight - 100)}px`
                : '80px'
            }}
            className='w-full resize-none rounded border p-2'
            value={state.note}
            autoFocus
            onChange={(e) => functions.setNote(e.target.value)}
            placeholder='Write your note here...'
          />
          <div className='mt-2 flex justify-end space-x-2'>
            <Button size='sm' variant='outline' onClick={() => functions.setPopoverPosition(null)}>
              Cancel
            </Button>
            <Button size='sm' onClick={functions.handleSaveNote}>
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
