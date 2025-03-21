import React from 'react';
import { toast } from 'sonner';

import { EditorPreview } from '@/components/editor';
import { BaseLayout } from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger, Textarea } from '@/components/ui';
import { useTimer } from '@/hooks';
import { cn } from '@/lib/utils';
import { useExamAnswersStore } from '@/utils/stores';

import { FinishTestAction, MoveToAction } from '../components';

interface Props {
  nextStep: IeltsTestType | null;
  test: WritingTest;
  onTestEnd: () => void;
}

export const WritingTest = ({ nextStep, test, onTestEnd }: Props) => {
  const [currentTab, setCurrentTab] = React.useState('part-1');
  const { timeLeft, leftFullTime } = useTimer({
    initialTime: 3600,
    autoStart: true,
    onTimeChange: (timeLeft) => {
      if (timeLeft === 600) toast.warning('You have 10 minutes left');
      else if (timeLeft === 300) toast.error('You have 5 minute left');
    },
    onTimerEnd: onTestEnd
  });
  const { writing, setWriting } = useExamAnswersStore();

  if (!writing) return;

  const getWordsCount = (text: string) => {
    const count = text.split(' ').filter(Boolean).length;
    if (count <= 1) return `${count} word`;
    return `${count} words`;
  };

  return (
    <div className='h-svh'>
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <header className='sticky inset-x-0 top-0 z-10 grid h-14 grid-cols-3 items-center border-b bg-background px-2 md:px-4'>
          <div className='flex items-center gap-6'>
            <h1 className='hidden text-lg font-semibold sm:block'>WRITING</h1>
            <div
              className={cn(
                'flex h-9 items-center rounded-md bg-secondary px-3 font-medium sm:text-lg',
                { 'text-yellow-500': timeLeft <= 600 },
                { 'text-destructive': timeLeft <= 60 }
              )}
            >
              {leftFullTime()}
            </div>
          </div>
          <TabsList className='justify-self-stretch'>
            {test.parts.map((part, index) => (
              <TabsTrigger key={part.id} value={`part-${index + 1}`}>
                {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className='flex justify-end'>
            {nextStep ? (
              <MoveToAction type={nextStep} onConfirm={onTestEnd} />
            ) : (
              <FinishTestAction onConfirm={onTestEnd} />
            )}
          </div>
        </header>
        <div className='h-[calc(100svh-56px)]'>
          {test.parts.map((part, index) => (
            <TabsContent key={part.id} className='h-full' value={`part-${index + 1}`}>
              <div className='grid h-full divide-x md:grid-cols-2'>
                <BaseLayout className='overflow-y-auto'>
                  <EditorPreview>
                    <div dangerouslySetInnerHTML={{ __html: part.question.content }} />
                  </EditorPreview>
                </BaseLayout>
                <BaseLayout className='relative h-full overflow-y-auto'>
                  <div className='absolute right-6 top-3 rounded-sm bg-background px-1'>
                    {index === 0 && <span>{getWordsCount(writing[1])}</span>}
                    {index === 1 && <span>{getWordsCount(writing[2])}</span>}
                  </div>
                  <Textarea
                    className='h-full py-6 text-base md:text-lg'
                    spellCheck={false}
                    value={writing[index + 1]}
                    onChange={(e) => setWriting(index + 1, e.target.value)}
                    placeholder={`Write task ${index + 1} here...`}
                  />
                </BaseLayout>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};
