import * as React from 'react';

import { Checkbox, CheckboxGroup } from '@/components/ui';

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
    <CheckboxGroup
      aria-label='Select options'
      className='space-y-3'
      id={`question-${answerOrder}`}
      value={values}
      onChange={handleChange}
      onFocusChange={() => onFocusChange?.(answerOrder)}
    >
      {value.options.map(
        (option) =>
          option.value && (
            <Checkbox
              key={option.id}
              className='w-fit'
              isDisabled={values.length >= value.limit && !values.includes(option.value)}
              value={option.value}
            >
              <span className='font-semibold'>{option.value})</span>
              {option.label}
            </Checkbox>
          )
      )}
    </CheckboxGroup>
  );
};
