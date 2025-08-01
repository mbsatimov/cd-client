import { CheckIcon } from '@radix-ui/react-icons';
import React from 'react';

import { cn } from '@/lib/utils.ts';

import type { MatchingFeaturesQuestionValue } from './types.ts';

interface Props {
  answerOrder: number;
  answers: Record<string, string>;
  focus?: number;
  value: MatchingFeaturesQuestionValue;
  onFocusChange?: (id: number) => void;
  setAnswer: (index: number, result: string | null) => void;
}

export const MatchingFeaturesPreview = ({
  focus,
  onFocusChange,
  value,
  answerOrder,
  answers,
  setAnswer
}: Props) => {
  return (
    <>
      <div>
        <table className='w-full border border-foreground/70'>
          <thead className='bg-primary/20'>
            <th className='border border-foreground/50 p-2' />
            {value.options.map((item, index) => (
              <th key={index} className='border border-foreground/50 p-2' scope='col'>
                {item.value}
              </th>
            ))}
          </thead>
          <tbody>
            {value.content.map((item, index) => {
              const order = answerOrder + index;
              return (
                <tr
                  key={index}
                  className={cn({ 'bg-primary/5': focus === order })}
                  id={`question-${order}`}
                  onFocus={() => onFocusChange?.(+order)}
                >
                  <th className='border border-foreground/50 p-2 text-left' scope='row'>
                    {index + 1}.<span className='ml-2 font-normal'>{item}</span>
                  </th>
                  {value.options.map((option, index) => (
                    <td
                      key={index}
                      className='border border-foreground/50 transition-colors hover:bg-primary/5'
                    >
                      <button
                        className='flex h-10 w-full items-center justify-center'
                        type='button'
                        onClick={() => setAnswer(order, option.value)}
                      >
                        {answers[order] === option.value ? (
                          <CheckIcon className='size-8 text-green-500' strokeWidth={4} />
                        ) : (
                          <CheckIcon className='size-8 text-green-500 opacity-0' strokeWidth={4} />
                        )}
                      </button>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {value.showOptions && (
        <div className='mt-10 w-fit rounded-md border bg-muted px-4 py-3'>
          {value.optionsTitle && <div className='mb-2 font-semibold'>{value.optionsTitle}</div>}
          <div className='grid grid-cols-[auto_1fr] items-center gap-x-3'>
            {value.options.map(
              (option) =>
                option.value && (
                  <React.Fragment key={option.id}>
                    <span className='font-semibold'>{option.value}</span>
                    <span className='text-sm'>{option.label}</span>
                  </React.Fragment>
                )
            )}
          </div>
        </div>
      )}
    </>
  );
};
