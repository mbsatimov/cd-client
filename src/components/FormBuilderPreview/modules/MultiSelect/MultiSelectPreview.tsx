import * as React from 'react';

import { Checkbox, Label } from '@/components/ui';
import { cn } from '@/lib/utils.ts';

import type { MultiSelectQuestionValue } from './types';

interface Props {
  answerOrder: number;
  answers: Record<string, string>;
  focus?: number;
  value: MultiSelectQuestionValue;
  onFocusChange?: (id: number) => void;
  setAnswer: (index: number, result: string | null) => void;
}

export const MultiSelectPreview = ({
  value,
  onFocusChange,
  answerOrder,
  answers,
  setAnswer
}: Props) => {
  const [values, setValues] = React.useState<string[]>(
    Array.from({ length: value.limit }, (_, i) => answers[answerOrder + i]).filter(Boolean)
  );

  const handleChange = (newValues: string[]) => {
    setValues(newValues);
    newValues.forEach((val, index) => setAnswer(answerOrder + index, val));
  };

  return (
    <div aria-label='Select options' className='space-y-3'>
      {value.options.map((option, index) => {
        const order = answerOrder++;
        return (
          <Label
            key={option.id}
            className={cn('flex items-center gap-2', {
              'opacity-50': values.length >= value.limit && !values.includes(option.value)
            })}
          >
            <Checkbox
              key={option.id}
              checked={values.includes(option.value)}
              disabled={values.length >= value.limit && !values.includes(option.value)}
              id={value.limit >= index + 1 ? `question-${order}` : undefined}
              value={option.value}
              onCheckedChange={(checked) => {
                if (checked) {
                  handleChange([...values, option.value]);
                } else {
                  handleChange(values.filter((val) => val !== option.value));
                }
              }}
              onFocus={value.limit >= index + 1 ? () => onFocusChange?.(order) : undefined}
            />
            <span>{option.label}</span>
          </Label>
        );
      })}
    </div>
  );
};
