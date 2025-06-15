import * as React from 'react';

import type { FormBuilderQuestionTypes, FormBuilderValue } from '../types.ts';

import { CompletionPreview } from '../modules/Completion';
import { DraggableSelectionPreview } from '../modules/DraggableSelection';
import { MultipleChoicePreview } from '../modules/MultipleChoice';
import { MultiSelectPreview } from '../modules/MultiSelect';
import { SelectionPreview } from '../modules/Selection';

const questionMap: Record<FormBuilderQuestionTypes, React.ComponentType<any>> = {
  completion: CompletionPreview,
  'multiple-choice': MultipleChoicePreview,
  selection: SelectionPreview,
  'multi-select': MultiSelectPreview,
  'draggable-selection': DraggableSelectionPreview
};

interface Props {
  answers: Record<string, string>;
  focus?: number;
  question: FormBuilderValue;
  questionEndNumber: number;
  questionStartNumber: number;
  onFocusChange?: (id: number) => void;
  setAnswer: (index: number, result: string) => void;
}

export const QuestionPreview = ({
  answers,
  setAnswer,
  question,
  questionEndNumber,
  questionStartNumber,
  focus,
  onFocusChange
}: Props) => {
  const Question = questionMap[question.type];

  return (
    <div>
      <p className='mb-4 text-lg font-bold'>
        {questionStartNumber < questionEndNumber &&
          `Questions ${questionStartNumber} - ${questionEndNumber}`}
        {questionStartNumber === questionEndNumber && `Question ${questionStartNumber}`}
      </p>

      {question.condition && (
        <p className='mb-3 whitespace-pre-wrap break-words text-base italic'>
          {question.condition}
        </p>
      )}
      <div className='rounded-md bg-secondary px-4 py-6'>
        {question.title && (
          <h2 className='mb-4 text-center text-lg font-semibold md:text-xl'>{question.title}</h2>
        )}
        <Question
          answerOrder={questionStartNumber}
          answers={answers}
          setAnswer={setAnswer}
          value={question}
          focus={focus}
          onFocusChange={onFocusChange}
        />
      </div>
    </div>
  );
};
