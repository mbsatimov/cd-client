import { Radio, RadioGroup } from '@/components/ui';
import { cn } from '@/lib/utils.ts';

import type { MultipleChoiceQuestionValue } from './types.ts';

interface Props {
  answerOrder: number;
  answers: Record<string, string>;
  focus?: number;
  value: MultipleChoiceQuestionValue;
  onFocusChange?: (id: number) => void;
  setAnswer: (index: number, result: string | null) => void;
}

export const MultipleChoicePreview = ({
  value,
  focus,
  onFocusChange,
  answerOrder,
  answers,
  setAnswer
}: Props) => (
  <div className='space-y-5'>
    {value.questions.map((question) => {
      const order = answerOrder++;
      return (
        <RadioGroup
          key={question.id}
          aria-label='Select an option'
          id={`question-${order}`}
          value={answers[order] || null}
          onChange={(value) => {
            setAnswer(order, value);
            onFocusChange?.(order);
          }}
          onFocus={() => onFocusChange?.(order)}
        >
          <div className='flex items-center gap-2'>
            <div
              className={cn(
                'rounded-sm border border-transparent font-bold',
                focus === order && 'border-primary'
              )}
            >
              {order}.
            </div>
            <p>{question.question}</p>
          </div>
          <div className='ml-5 space-y-3'>
            {question.options.map((option) => (
              <Radio key={option.id} className='w-fit' value={option.value}>
                <span className='font-semibold'>{option.value}</span>
                {option.label}
              </Radio>
            ))}
          </div>
        </RadioGroup>
      );
    })}
  </div>
);
