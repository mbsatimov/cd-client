import { ArrowLeftIcon, ArrowRightIcon, CheckCheckIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { FormBuilder, getQuestionsCount } from '@/components/FormBuilderPreview';
import { BaseLayout, ThemeSwitch } from '@/components/layout';
import {
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tabs,
  TabsContent
} from '@/components/ui';
import { useTimer } from '@/hooks';
import { cn } from '@/lib/utils.ts';
import { useExamAnswersStore } from '@/utils/stores';

import { EditorPreview } from '../../editor';
import { FinishTestAction, MoveToAction } from '../components';

interface Props {
  hideNextButton?: boolean;
  nextStep: IeltsTestType | null;
  test: ReadingTest;
  onTestEnd: () => void;
}

export const ReadingTest = ({ hideNextButton, nextStep, test, onTestEnd }: Props) => {
  const [currentTab, setCurrentTab] = React.useState<number>(1);
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
  const [currentFocusQuestionId, setCurrentFocusQuestionId] = React.useState<number>(1);

  if (!reading) return;

  let questionsOrder = 1;

  const focusToQuestionById = (id: number) => {
    const question = document.getElementById(`question-${id}`);
    setCurrentFocusQuestionId(id);
    question?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    question?.focus({ preventScroll: true });
  };

  const getTabFirstQuestion = (tab: number) => {
    return test.parts
      .slice(0, tab - 1)
      .reduce((acc, part) => acc + part.question.numberOfQuestions, 1);
  };

  const onTabChange = (tab: number) => {
    setCurrentTab(tab);
    const firstQuestionId = getTabFirstQuestion(tab);
    focusToQuestionById(firstQuestionId);
  };

  const onFocusNext = () => {
    const currentPartLastNumber = test.parts
      .slice(0, currentTab)
      .reduce((acc, part) => acc + part.question.numberOfQuestions, 0);

    const isLastQuestion =
      currentPartLastNumber === currentFocusQuestionId && test.parts.length === currentTab;

    if (isLastQuestion) return;
    console.log(currentPartLastNumber, currentFocusQuestionId);
    if (currentPartLastNumber === currentFocusQuestionId) {
      onTabChange(currentTab + 1);
    }
    focusToQuestionById(currentFocusQuestionId + 1);
  };

  const onFocusPrev = () => {
    if (currentFocusQuestionId === 1) return;
    const currentPartFirstNumber = test.parts
      .slice(0, currentTab - 1)
      .reduce((acc, part) => acc + part.question.numberOfQuestions, 1);

    if (currentFocusQuestionId === currentPartFirstNumber) {
      setCurrentTab(currentTab - 1);
    }

    focusToQuestionById(currentFocusQuestionId - 1);
  };

  const getSolvedPartQuestionsCount = (tab: number) => {
    const firstQuestionId = getTabFirstQuestion(tab);
    const lastQuestionId = firstQuestionId + test.parts[tab - 1].question.numberOfQuestions;
    let count = 0;
    for (let i = firstQuestionId; i <= lastQuestionId; i++) {
      if (reading[i]) count++;
    }
    return count;
  };

  return (
    <Tabs
      className='flex h-screen flex-col'
      value={String(currentTab)}
      onValueChange={(value) => onTabChange(+value)}
    >
      <header className='flex h-14 items-center justify-between border-b bg-background px-2 md:px-4'>
        <div className='flex items-center gap-6'>
          <span className='hidden text-lg font-semibold sm:block'>READING</span>
        </div>
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
        {test.parts.map((part, index) => {
          const questionsCount = getQuestionsCount(part.question.content);
          const currentQuestionStartNumber = questionsOrder;
          questionsOrder += questionsCount;
          return (
            <TabsContent key={part.id} className='h-full' value={String(index + 1)}>
              <ResizablePanelGroup direction='horizontal'>
                <ResizablePanel style={{ overflowY: 'auto' }}>
                  <BaseLayout className='min-w-80'>
                    <EditorPreview>
                      <div dangerouslySetInnerHTML={{ __html: part.passage }} />
                    </EditorPreview>
                  </BaseLayout>
                </ResizablePanel>
                <ResizableHandle withHandle className='w-1' />
                <ResizablePanel style={{ overflowY: 'auto' }}>
                  <BaseLayout className='min-w-80'>
                    <FormBuilder
                      answers={reading}
                      setAnswer={setReading}
                      focus={currentFocusQuestionId}
                      onFocusChange={setCurrentFocusQuestionId}
                      questions={part.question.content}
                      questionsStartNumber={currentQuestionStartNumber}
                    />
                  </BaseLayout>
                </ResizablePanel>
              </ResizablePanelGroup>
            </TabsContent>
          );
        })}
      </div>
      <div className='relative flex h-14 items-center justify-between'>
        {test.parts.map((part, index) => {
          const tabFirstQuestionId = getTabFirstQuestion(index + 1);
          const solvedQuestionsCount = getSolvedPartQuestionsCount(index + 1);
          const isSolved = solvedQuestionsCount === part.question.numberOfQuestions;
          return index + 1 === currentTab ? (
            <div
              key={index}
              className={cn('flex h-full flex-1 items-center gap-4 text-nowrap border-y-2 p-4', {})}
            >
              <span className='font-bold'>Part {index + 1}</span>
              <div className='flex gap-2'>
                {Array.from({ length: part.question.numberOfQuestions }).map((_, i) => {
                  const questionId = tabFirstQuestionId + i;
                  return (
                    <div key={questionId} className='relative space-y-1'>
                      <div
                        className={cn('absolute bottom-full h-1 w-full rounded-sm bg-muted', {
                          'bg-green-500': !!reading[questionId]
                        })}
                      />
                      <Button
                        size='iconSm'
                        variant={currentFocusQuestionId === questionId ? 'default' : 'secondary'}
                        onClick={() => focusToQuestionById(questionId)}
                      >
                        {questionId}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <button
              key={part.id}
              className={cn('flex h-full flex-1 items-center gap-3 border-y-2 p-4 hover:bg-muted', {
                'border-y-2 border-t-green-500': isSolved
              })}
              value={`part-${index + 1}`}
              onClick={() => onTabChange(index + 1)}
            >
              {isSolved && <CheckCheckIcon className='size-5 text-green-500' />} Part {index + 1}
              {!isSolved && (
                <span className='text-muted-foreground'>
                  {solvedQuestionsCount} of {part.question.numberOfQuestions}
                </span>
              )}
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
    </Tabs>
  );
};
