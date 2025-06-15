import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { FormBuilder, getQuestionsCount } from '@/components/FormBuilderPreview';
import { BaseLayout } from '@/components/layout';
import {
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
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
  const [currentFocusQuestionId, setCurrentFocusQuestionId] = React.useState<number>(1);

  if (!reading) return;

  let questionsOrder = 1;

  const focusToQuestionById = (id: number) => {
    const question = document.getElementById(`question-${id}`);
    question?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    question?.focus({ preventScroll: true });
    setCurrentFocusQuestionId(id);
  };

  const onFocusNext = () => {
    const tab = +currentTab.split('-')[1];
    const currentPartLastNumber = test.parts
      .slice(0, tab)
      .reduce((acc, part) => acc + part.question.numberOfQuestions, 0);

    const isLastQuestion =
      currentPartLastNumber === currentFocusQuestionId && test.parts.length === tab;

    if (isLastQuestion) return;
    if (currentPartLastNumber === currentFocusQuestionId) {
      setCurrentTab(`part-${tab + 1}`);
    }
    focusToQuestionById(currentFocusQuestionId + 1);
  };

  const onFocusPrev = () => {
    if (currentFocusQuestionId === 1) return;
    const tab = +currentTab.split('-')[1];
    const currentPartFirstNumber = test.parts
      .slice(0, tab - 1)
      .reduce((acc, part) => acc + part.question.numberOfQuestions, 1);

    if (currentFocusQuestionId === currentPartFirstNumber) {
      setCurrentTab(`part-${tab - 1}`);
    }

    focusToQuestionById(currentFocusQuestionId - 1);
  };

  return (
    <Tabs className='flex h-screen flex-col' value={currentTab} onValueChange={setCurrentTab}>
      <header className='grid h-14 grid-cols-3 items-center border-b bg-background px-2 md:px-4'>
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
              Part {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className='flex justify-end'>
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
            <TabsContent key={part.id} className='h-full' value={`part-${index + 1}`}>
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
      <div className='flex h-14 items-center justify-between border-t px-4'>
        <div>
          {test.parts.map((part, index) => (
            <TabsContent key={part.id} className='flex gap-2' value={`part-${index + 1}`}>
              {Array.from({ length: part.question.numberOfQuestions }).map((_, i) => {
                const questionId = index * 10 + i + 1;
                return (
                  <div key={questionId} className='space-y-1'>
                    <Button
                      size='iconSm'
                      variant={currentFocusQuestionId === questionId ? 'default' : 'secondary'}
                      onClick={() => focusToQuestionById(questionId)}
                    >
                      {questionId}
                    </Button>
                    <div
                      className={cn('h-1 w-full rounded-sm bg-muted', {
                        'bg-green-500': !!reading[questionId]
                      })}
                    />
                  </div>
                );
              })}
            </TabsContent>
          ))}
        </div>
        <div className='flex gap-2'>
          <Button size='iconSm' variant='secondary' onClick={onFocusPrev}>
            <ArrowLeftIcon />
          </Button>
          <Button size='iconSm' variant='secondary' onClick={onFocusNext}>
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </Tabs>
  );
};
