import { ArrowLeftIcon, ArrowRightIcon, CheckCheckIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { EditorPreview } from '@/components/editor';
import { BaseLayout, ThemeSwitch } from '@/components/layout';
import {
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Textarea
} from '@/components/ui';
import { useTimer } from '@/hooks';
import { cn } from '@/lib/utils';
import { useExamAnswersStore } from '@/utils/stores';

import { FinishTestAction, MoveToAction } from '../components';

interface Props {
  hideNextButton?: boolean;
  nextStep: IeltsTestType | null;
  test: WritingTest;
  onTestEnd: () => void;
}

export const WritingTest = ({ hideNextButton, nextStep, test, onTestEnd }: Props) => {
  const [currentTab, setCurrentTab] = React.useState(1);
  const { timeLeft, leftFullTime } = useTimer({
    initialTime: 3600,
    autoStart: true,
    onTimeChange: (timeLeft) => {
      if (timeLeft === 120) toast.warning('You have 2 minutes left');
      else if (timeLeft === 60) toast.error('You have 1 minute left');
    },
    onTimerEnd: onTestEnd
  });
  const { writing, setWriting } = useExamAnswersStore();

  console.log(writing, test);

  if (!writing) return;

  const getWordsCount = (text: string) => {
    const count = text.split(' ').filter(Boolean).length;
    if (count === 0) return '0 words';
    else if (count === 1) return `${count} word`;
    return `${count} words`;
  };

  const onFocusPrev = () => {
    const prevTab = currentTab - 1;
    if (prevTab === 0) return;
    setCurrentTab(prevTab);
  };

  const onFocusNext = () => {
    const nextTab = currentTab + 1;
    if (nextTab > test.parts.length) return;
    setCurrentTab(nextTab);
  };

  return (
    <div className='flex h-screen flex-col'>
      <header className='flex h-14 items-center justify-between border-b bg-background px-2 md:px-4'>
        <h1 className='hidden text-lg font-semibold sm:block'>WRITING</h1>
        <div className='flex justify-end gap-4'>
          <div
            className={cn(
              'flex h-9 items-center rounded-md bg-secondary px-3 font-medium sm:text-lg',
              { 'text-yellow-500': timeLeft <= 120 },
              { 'text-destructive': timeLeft <= 60 }
            )}
          >
            {leftFullTime()}
          </div>
          <ThemeSwitch />
          {!hideNextButton &&
            (nextStep ? (
              <MoveToAction type={nextStep} onConfirm={onTestEnd} />
            ) : (
              <FinishTestAction onConfirm={onTestEnd} />
            ))}
        </div>
      </header>
      <div className='min-w-0 flex-1 overflow-y-auto'>
        {test.parts.map((part, index) => (
          <div key={part.id} className={cn('hidden h-full', index + 1 === currentTab && 'block')}>
            <ResizablePanelGroup direction='horizontal'>
              <ResizablePanel style={{ overflowY: 'auto' }}>
                <BaseLayout className='min-w-80'>
                  <EditorPreview>
                    <div dangerouslySetInnerHTML={{ __html: part.question.content }} />
                  </EditorPreview>
                </BaseLayout>
              </ResizablePanel>
              <ResizableHandle withHandle className='w-1' />
              <ResizablePanel style={{ overflowY: 'auto' }}>
                <BaseLayout className='relative h-full min-w-80'>
                  <div className='absolute right-6 top-3 rounded-sm bg-background px-1'>
                    <span>{getWordsCount(writing[index + 1])}</span>
                  </div>
                  <Textarea
                    className='h-full py-6 text-base md:text-lg'
                    spellCheck={false}
                    value={writing[index + 1]}
                    onChange={(e) => setWriting(index + 1, e.target.value)}
                    placeholder={`Write part ${index + 1} here...`}
                  />
                </BaseLayout>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        ))}
      </div>

      <div className='relative flex h-14 items-center justify-between'>
        {test.parts.map((part, index) => {
          const isSolved = writing[index + 1];
          return index + 1 === currentTab ? (
            <div
              key={index}
              className={cn('flex h-full flex-1 items-center gap-4 text-nowrap border-y-2 p-4', {})}
            >
              <span className='font-bold'>Part {index + 1}</span>
            </div>
          ) : (
            <button
              key={part.id}
              className={cn('flex h-full flex-1 items-center gap-3 border-y-2 p-4 hover:bg-muted', {
                'border-y-2 border-t-green-500': isSolved
              })}
              value={`part-${index + 1}`}
              onClick={() => setCurrentTab(index + 1)}
            >
              {isSolved && <CheckCheckIcon className='size-5 text-green-500' />} Part {index + 1}
              {!isSolved && <span className='text-muted-foreground'>{isSolved ? 1 : 0} of 1</span>}
            </button>
          );
        })}
        <div className='absolute bottom-[calc(100%+0.5rem)] right-2 flex gap-2'>
          <Button size='iconLg' onClick={onFocusPrev}>
            <ArrowLeftIcon />
          </Button>
          <Button size='iconLg' onClick={onFocusNext}>
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
