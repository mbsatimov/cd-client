import * as React from 'react';

import { Checkbox, CheckboxGroup } from '@/components/ui';

import type { MultiSelectQuestionValue } from './types';

interface Props {
  answerOrder: number;
  answers: Record<string, string>;
  value: MultiSelectQuestionValue;
  setAnswer: (index: number, result: string | null) => void;
}

export const MultiSelectPreview = ({ value, answerOrder, answers, setAnswer }: Props) => {
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
      value={values}
      onChange={handleChange}
    >
      {value.options.map(
        (option) =>
          option.value && (
            <Checkbox
              key={option.id}
              id={option.id}
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
