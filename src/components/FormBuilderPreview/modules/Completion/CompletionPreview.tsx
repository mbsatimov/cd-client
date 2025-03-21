import { EditorPreview } from '@/components/editor';

import type { CompletionQuestionValue } from './types';

import { DynamicContentReplacer } from '../../plugins';

interface Props {
  answerOrder: number;
  answers: Record<string, string>;
  value: CompletionQuestionValue;
  setAnswer: (index: number, result: string | null) => void;
}

export const CompletionPreview = ({ value, answerOrder, answers, setAnswer }: Props) => (
  <EditorPreview>
    <DynamicContentReplacer
      replacer={(index) => {
        const order = answerOrder + index;
        return (
          <input
            key={order}
            className='h-5 max-w-[100px] rounded-[3px] bg-background px-1 text-center text-sm outline-none'
            spellCheck={false}
            value={answers[order] || ''}
            onChange={(e) => setAnswer(order, e.target.value)}
            placeholder={`${order}`}
          />
        );
      }}
      searchValue='@@'
      content={value.content}
    />
  </EditorPreview>
);
