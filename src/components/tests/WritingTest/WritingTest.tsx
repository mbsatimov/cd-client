import React from 'react';
import { toast } from 'sonner';

import { EditorPreview } from '@/components/editor';
import { BaseLayout, ThemeSwitch } from '@/components/layout';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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
    if (count === 0) return '0 words';
    else if (count === 1) return `${count} word`;
    return `${count} words`;
  };

  return (
    <Tabs className='flex h-screen flex-col' value={currentTab} onValueChange={setCurrentTab}>
      <header className='grid h-14 grid-cols-3 items-center border-b bg-background px-2 md:px-4'>
        <h1 className='hidden text-lg font-semibold sm:block'>WRITING</h1>
        <TabsList className='justify-self-stretch'>
          {test.parts.map((part, index) => (
            <TabsTrigger key={part.id} value={`part-${index + 1}`}>
              Part {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className='flex justify-end gap-4'>
          <div
            className={cn(
              'flex h-9 items-center rounded-md bg-secondary px-3 font-medium sm:text-lg',
              { 'text-yellow-500': timeLeft <= 600 },
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
          <TabsContent key={part.id} className='h-full' value={`part-${index + 1}`}>
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
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
