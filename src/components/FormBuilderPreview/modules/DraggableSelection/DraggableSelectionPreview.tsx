import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import React from 'react';

import { EditorPreview } from '@/components/editor';
import { getQuestionCount } from '@/components/FormBuilderPreview/helpers.ts';
import { cn } from '@/lib/utils.ts';

import type { DraggableSelectionQuestionValue } from './types';

import { DynamicContentReplacer } from '../../plugins';
import { Draggable } from './component/Draggable.tsx';
import { Droppable } from './component/Droppable.tsx';

interface Props {
  answerOrder: number;
  answers: Record<string, string>;
  focus?: number;
  value: DraggableSelectionQuestionValue;
  onFocusChange?: (id: number) => void;
  setAnswer: (index: number, result: string | null) => void;
}

export const DraggableSelectionPreview = ({
  focus,
  onFocusChange,
  value,
  answerOrder,
  answers,
  setAnswer
}: Props) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [activeLabel, setActiveLabel] = React.useState<string | null>(null);

  const findResultOrder = (v: string) => {
    const count = getQuestionCount(value);
    const start = answerOrder;
    const end = answerOrder + count;

    for (const order in answers) {
      const item = answers[order];
      if (+order < start) continue;
      else if (+order > end) return;
      else {
        if (item === v) return +order;
      }
    }
  };

  const parseItems = () => {
    return value.options.map((option, index) => ({
      ...option,
      id: index + answerOrder,
      active: !!findResultOrder(option.value)
    }));
  };

  const options = parseItems();

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) {
      const prevOverId = active.data.current?.overId;
      if (!prevOverId) return;
      setAnswer(prevOverId, '');
      return;
    }

    const [slug] = String(active.id).split('-');

    if (slug === 'drag') {
      const prevOverId = active.data.current?.overId;
      if (!prevOverId) return;
      setAnswer(prevOverId, '');
    }

    const overId = String(over.id).split('-')[1];

    setAnswer(+overId, active.data.current?.value);

    setActiveId(null);
    setActiveLabel(null);
  };

  const onDragStart = (e: DragStartEvent) => {
    setActiveId(String(e.active.id));
    setActiveLabel(e.active.data.current?.value);
  };

  const onDragCancel = () => {
    setActiveId(null);
    setActiveLabel(null);
  };

  return (
    <DndContext onDragCancel={onDragCancel} onDragEnd={handleDragEnd} onDragStart={onDragStart}>
      <div className='flex'>
        <EditorPreview>
          <DynamicContentReplacer
            replacer={(index) => {
              const order = String(answerOrder + index);
              return (
                <Droppable
                  key={order}
                  className={cn(
                    'z-1 relative inline-flex min-h-5 min-w-[100px] rounded-[3px] bg-background outline-none',
                    {
                      'border-2 border-dashed border-muted-foreground focus:ring focus:ring-primary/30':
                        !answers[order],
                      'border-primary': activeId,
                      'ring ring-primary/30': focus === +order
                    }
                  )}
                  id={`question-${order}`}
                  onFocus={() => onFocusChange?.(+order)}
                >
                  {answers[order] ? (
                    <Draggable
                      key={order}
                      className={cn(
                        'min-h-5 min-w-[100px] rounded-[3px] border border-transparent bg-background px-2 text-sm leading-5 hover:border-primary',
                        { 'z-10 border !border-primary': activeId === `drag-${order}` }
                      )}
                      id={`drag-${order}`}
                      overId={order}
                    >
                      {answers[order]}
                    </Draggable>
                  ) : (
                    <span className='flex-1 border border-transparent text-center text-sm leading-4 text-muted-foreground'>
                      {order}
                    </span>
                  )}
                </Droppable>
              );
            }}
            searchValue='@@'
            content={value.content}
          />
        </EditorPreview>

        <div className='mb-4 ml-8 flex flex-col gap-4 rounded-md border border-border bg-muted/30 p-3'>
          {options.map((option) =>
            option.active ? (
              <span key={option.id} className='min-h-5 min-w-[100px] border border-transparent' />
            ) : (
              <Draggable
                key={option.id}
                className={cn(
                  'inline-block min-h-5 w-fit min-w-[100px] rounded-[5px] border border-transparent bg-background px-2 text-sm leading-5 hover:border-primary'
                )}
                id={`dragbank-${option.id}`}
              >
                {option.value}
              </Draggable>
            )
          )}
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <Draggable
            className={cn(
              'inline-block min-h-5 min-w-[100px] rounded-[3px] border !border-primary bg-background px-2 text-sm leading-5 hover:border-primary'
            )}
            id={activeId}
            overId={activeId.split('-')[1]}
          >
            {activeLabel}
          </Draggable>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
