import React from 'react';
import { toast } from 'sonner';

import { FormBuilder, getQuestionsCount } from '@/components/FormBuilderPreview';
import { BaseLayout } from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { useTimer } from '@/hooks';
import { cn } from '@/lib/utils.ts';
import { useExamAnswersStore } from '@/utils/stores';

import { EditorPreview } from '../../editor';
import { FinishTestAction, MoveToAction } from '../components';

interface Props {
  nextStep: IeltsTestType | null;
  test: ReadingTest;
  onTestEnd: () => void;
}

export const ReadingTest = ({ nextStep, test, onTestEnd }: Props) => {
  const [currentTab, setCurrentTab] = React.useState('part-1');
  const { timeLeft, leftFullTime } = useTimer({
    initialTime: 3600,
    autoStart: true,
    onTimeChange: (timeLeft: number) => {
      if (timeLeft === 600) toast.warning('You have 10 minutes left');
      else if (timeLeft === 300) toast.error('You have 5 minute left');
    },
    onTimerEnd: onTestEnd
  });
  const { reading, setReading } = useExamAnswersStore();

  if (!reading) return;

  let questionsOrder = 1;

  return (
    <div className='h-svh'>
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <header className='sticky inset-x-0 top-0 z-10 grid h-14 grid-cols-3 items-center border-b bg-background px-2 md:px-4'>
          <div className='flex items-center gap-6'>
            <span className='hidden text-lg font-semibold sm:block'>READING</span>
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
          {test.parts.map((part, index) => {
            const questionsCount = getQuestionsCount(part.question.content);
            const currentQuestionStartNumber = questionsOrder;
            questionsOrder += questionsCount;
            return (
              <TabsContent key={part.id} className='h-full' value={`part-${index + 1}`}>
                <div className='grid h-full divide-x md:grid-cols-2'>
                  <BaseLayout className='overflow-y-auto'>
                    <EditorPreview>
                      <div dangerouslySetInnerHTML={{ __html: part.passage }} />
                    </EditorPreview>
                  </BaseLayout>
                  <BaseLayout className='overflow-y-auto'>
                    <FormBuilder
                      answers={reading}
                      setAnswer={setReading}
                      questions={part.question.content}
                      questionsStartNumber={currentQuestionStartNumber}
                    />
                  </BaseLayout>
                </div>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
};
