import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { EditorPreview } from '@/components/editor';
import { helpDataMap } from '@/components/FormBuilderPreview/components/help-data.ts';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

import type { FormBuilderQuestionTypes, FormBuilderValue } from '../types.ts';

import { CompletionPreview } from '../modules/Completion';
import { DraggableSelectionPreview } from '../modules/DraggableSelection';
import { MatchingFeaturesPreview } from '../modules/MatchingFeatures';
import { MultipleChoicePreview } from '../modules/MultipleChoice';
import { MultiSelectPreview } from '../modules/MultiSelect';
import { SelectionPreview } from '../modules/Selection';

const questionMap: Record<FormBuilderQuestionTypes, React.ComponentType<any>> = {
  completion: CompletionPreview,
  'multiple-choice': MultipleChoicePreview,
  selection: SelectionPreview,
  'multi-select': MultiSelectPreview,
  'draggable-selection': DraggableSelectionPreview,
  'matching-features': MatchingFeaturesPreview
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
      <div className='mb-4 flex items-center justify-between'>
        <p className='text-lg font-bold'>
          {questionStartNumber < questionEndNumber &&
            `Questions ${questionStartNumber} - ${questionEndNumber}`}
          {questionStartNumber === questionEndNumber && `Question ${questionStartNumber}`}
        </p>
        <div>
          <Popover>
            <PopoverTrigger className='flex items-center gap-1 hover:text-primary'>
              <QuestionMarkCircledIcon className='size-4' />
              Help
            </PopoverTrigger>
            <PopoverContent align='end' className='w-full max-w-lg'>
              {helpDataMap[question.type]}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {question.condition && (
        <EditorPreview>
          <div className='mb-3' dangerouslySetInnerHTML={{ __html: question.condition }} />
        </EditorPreview>
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
