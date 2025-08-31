import React, { useMemo } from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils.ts';

import type { SentenceReorderingQuestionValue } from './types';

import { randomizeSentence } from './helper.ts';

interface Props {
  answerOrder: number;
  answers: Record<string, string>;
  focus?: number;
  value: SentenceReorderingQuestionValue;
  onFocusChange?: (id: number) => void;
  setAnswer: (index: number, result: string | null) => void;
}

export const SentenceReorderingPreview = ({
  onFocusChange,
  setAnswer,
  value,
  answerOrder
}: Props) => {
  const words = useMemo(() => randomizeSentence(value.sentence), [value.sentence]);

  const [selectedWordIndexes, setSelectedWordIndexes] = React.useState<number[]>([]);

  const onChange = (index: number) => {
    setSelectedWordIndexes((prev) => {
      let newIndexes;
      if (prev.includes(index)) {
        newIndexes = prev.filter((i) => i !== index);
      } else {
        newIndexes = [...prev, index];
      }

      setAnswer(answerOrder, newIndexes.map((i) => words[i]).join(' '));

      return newIndexes;
    });
  };

  return (
    <div>
      <div className='mb-4 flex gap-1.5'>
        {words.map((word, index) => (
          <Button
            key={index}
            className='border border-primary'
            id={index === 0 ? `question-${answerOrder}` : undefined}
            size='sm'
            variant={selectedWordIndexes.includes(index) ? 'default' : 'outline'}
            onClick={() => onChange(index)}
            onFocus={() => onFocusChange?.(answerOrder)}
          >
            {word}
          </Button>
        ))}
      </div>
      <div className='bg-background p-2'>
        <div
          className={cn(
            'border-b pb-1',
            selectedWordIndexes.length === 0 && 'text-muted-foreground/50'
          )}
        >
          {selectedWordIndexes.map((index) => words[index]).join(' ') ||
            'Select words in correct grammatical order'}
        </div>
      </div>
    </div>
  );
};
