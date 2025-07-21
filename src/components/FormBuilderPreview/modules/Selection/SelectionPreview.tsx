import React from 'react';

import { EditorPreview } from '@/components/editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { cn } from '@/lib/utils.ts';

import type { SelectionQuestionValue } from './types';

import { DynamicContentReplacer } from '../../plugins';

interface Props {
  answerOrder: number;
  answers: Record<string, string>;
  focus?: number;
  value: SelectionQuestionValue;
  onFocusChange?: (id: number) => void;
  setAnswer: (index: number, result: string | null) => void;
}

export const SelectionPreview = ({
  value,
  onFocusChange,
  answerOrder,
  answers,
  focus,
  setAnswer
}: Props) => (
  <>
    {value.showOptions && (
      <div className='mb-10 grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 rounded-md border bg-muted p-2'>
        {value.options.map(
          (option) =>
            option.value && (
              <React.Fragment key={option.id}>
                <span className='mr-3 font-semibold'>{option.value}</span>
                <span>{option.label}</span>
              </React.Fragment>
            )
        )}
      </div>
    )}
    <EditorPreview>
      <DynamicContentReplacer
        replacer={(index) => {
          const order = answerOrder + index;
          return (
            <Select value={answers[order]} onValueChange={(value) => setAnswer(order, value)}>
              <SelectTrigger
                className={cn(
                  'inline-flex h-5 w-fit min-w-[100px] select-none gap-2 rounded-[3px] border-none bg-background px-1 py-0 text-center align-text-top text-sm shadow-none focus:outline-none focus:ring focus:ring-primary/30',
                  { 'ring ring-primary/30': focus === order }
                )}
                id={`question-${order}`}
                onFocus={() => onFocusChange?.(order)}
              >
                <span />
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                {value.options.map(
                  (option) =>
                    option.value && (
                      <SelectItem key={option.id} value={option.value}>
                        {option.value}
                      </SelectItem>
                    )
                )}
              </SelectContent>
            </Select>
          );
        }}
        searchValue='@@'
        content={value.content}
      />
    </EditorPreview>
  </>
);
