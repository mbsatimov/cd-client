import { Radio, RadioGroup } from '@/components/ui';

import type { MultipleChoiceQuestionValue } from './types.ts';

interface Props {
  answerOrder: number;
  answers: Record<string, string>;
  value: MultipleChoiceQuestionValue;
  setAnswer: (index: number, result: string | null) => void;
}

export const MultipleChoicePreview = ({ value, answerOrder, answers, setAnswer }: Props) => (
  <div className='space-y-3'>
    {value.questions.map((question) => {
      const order = answerOrder++;
      return (
        <div key={question.id}>
          <div className='group/question flex items-center gap-2'>
            <div className='font-bold'>{order}.</div>
            <p>{question.question}</p>
          </div>
          <div className='ml-5 space-y-3 py-3'>
            {question.options.map(
              (option) =>
                option.value && (
                  <RadioGroup
                    key={option.id}
                    aria-label='Select option'
                    value={answers[order] || ''}
                    onChange={() => setAnswer(order, option.value)}
                  >
                    <div className='flex items-center gap-3'>
                      <Radio id={option.id} value={option.value}>
                        <span className='font-semibold'>{option.value}</span>
                        {option.label}
                      </Radio>
                    </div>
                  </RadioGroup>
                )
            )}
          </div>
        </div>
      );
    })}
  </div>
);
