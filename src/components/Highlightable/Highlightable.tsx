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

  console.log(state.popoverPosition);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div ref={state.containerRef} onContextMenu={functions.handleContextMenu}>
            {children}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-48'>
          {!state.selection && state.rightClickedMark && (
            <>
              <ContextMenuItem
                onClick={(e) =>
                  functions.setPopoverPosition({ top: e.clientY - 200, left: e.clientX - 250 })
                }
              >
                <NotebookIcon />
                Notes
              </ContextMenuItem>
              <ContextMenuItem onClick={functions.handleClearHighlight}>
                <DeleteIcon />
                Clear
              </ContextMenuItem>
              <ContextMenuItem onClick={functions.handleClearAllHighlights}>
                <Trash2Icon />
                Clear All
              </ContextMenuItem>
            </>
          )}
          {state.selection && (
            <ContextMenuItem onClick={functions.handleHighlight}>Highlight</ContextMenuItem>
          )}
        </ContextMenuContent>
      </ContextMenu>

      {/* Custom Popover for Notes */}
      {state.popoverPosition && (
        <div
          className='absolute z-50 w-64 rounded-lg border bg-background p-4 shadow-lg'
          style={{ top: state.popoverPosition.top, left: state.popoverPosition.left }}
        >
          <h3 className='mb-2 text-sm font-semibold'>Add Note</h3>
          <Textarea
            className='h-20 w-full rounded border p-2'
            value={state.note}
            onChange={(e) => functions.setNote(e.target.value)}
            placeholder='Write your note here...'
          />
          <div className='mt-2 flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => functions.setPopoverPosition(null)}>
              Cancel
            </Button>
            <Button onClick={functions.handleSaveNote}>Save</Button>
          </div>
        </div>
      )}
    </>
  );
};
