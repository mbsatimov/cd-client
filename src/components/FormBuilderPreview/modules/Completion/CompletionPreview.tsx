import { EditorPreview } from '@/components/editor';
import { cn } from '@/lib/utils.ts';

import type { CompletionQuestionValue } from './types';

import { DynamicContentReplacer } from '../../plugins';

interface Props {
  answerOrder: number;
  answers: Record<string, string>;
  focus?: number;
  value: CompletionQuestionValue;
  onFocusChange?: (id: number) => void;
  setAnswer: (index: number, result: string | null) => void;
}

export const CompletionPreview = ({
  value,
  focus,
  onFocusChange,
  answerOrder,
  answers,
  setAnswer
}: Props) => (
  <EditorPreview>
    <DynamicContentReplacer
      replacer={(index) => {
        const order = answerOrder + index;
        return (
          <input
            key={order}
            className={cn(
              'h-5 min-w-[100px] rounded-[3px] bg-background px-1 text-center font-mono text-sm outline-none ring-primary/30 focus-visible:ring',
              focus === order && 'ring-2'
            )}
            style={{
              width: `${Math.max((answers[order]?.length || 0) + 1, 2)}ch`
            }}
            id={`question-${order}`}
            spellCheck={false}
            value={answers[order] || ''}
            autoComplete='off'
            autoCorrect='off'
            onChange={(e) => setAnswer(order, e.target.value)}
            onFocus={() => onFocusChange?.(order)}
            placeholder={`${order}`}
          />
        );
      }}
      searchValue='@@'
      content={value.content}
    />
  </EditorPreview>
);
