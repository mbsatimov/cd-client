import * as React from 'react';

import { cn } from '@/lib/utils.ts';

import type { FormBuilderValue } from './types.d.ts';

import { QuestionPreview } from './components';
import { getQuestionCount } from './helpers.ts';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  answers: Record<string, string>;
  questions: FormBuilderValue[];
  questionsStartNumber?: number;
  setAnswer: (index: number, result: string) => void;
}

export const FormBuilder = ({
  answers,
  setAnswer,
  className,
  questions,
  questionsStartNumber = 1,
  ...props
}: Props) => {
  return (
    <div className={cn('space-y-10', className)} {...props}>
      {questions.map((question) => {
        const currentQuestionStartNumber = questionsStartNumber;
        questionsStartNumber += getQuestionCount(question);
        const currentQuestionEndNumber = questionsStartNumber - 1;
        return (
          <QuestionPreview
            key={question.id}
            answers={answers}
            setAnswer={setAnswer}
            question={question}
            questionEndNumber={currentQuestionEndNumber}
            questionStartNumber={currentQuestionStartNumber}
          />
        );
      })}
    </div>
  );
};
