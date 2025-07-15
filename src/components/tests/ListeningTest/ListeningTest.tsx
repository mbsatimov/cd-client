import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCheckIcon,
  Volume2Icon,
  VolumeXIcon
} from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { FormBuilder } from '@/components/FormBuilderPreview';
import { BaseLayout, ThemeSwitch } from '@/components/layout';
import { Button, Slider } from '@/components/ui';
import { useTimer } from '@/hooks';
import { cn } from '@/lib/utils.ts';
import { useExamAnswersStore } from '@/utils/stores';

import { FinishTestAction, MoveToAction } from '../components';

interface Props {
  hideNextButton?: boolean;
  nextStep: IeltsTestType | null;
  test: ListeningTest;
  volume: number;
  onTestEnd: () => void;
  onVolumeChange: (volume: number) => void;
}

export const ListeningTest = ({
  test,
  hideNextButton = false,
  nextStep,
  onTestEnd,
  onVolumeChange,
  volume = 1
}: Props) => {
  const [currentTab, setCurrentTab] = React.useState<number>(1);
  const audios = test.parts.map((part) => part.audio.url);
  const [currentAudioIndex, setCurrentAudioIndex] = React.useState<number | null>(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { listening, setListening } = useExamAnswersStore();
  const [currentFocusQuestionId, setCurrentFocusQuestionId] = React.useState<number>(1);

  const { timeLeft, leftFullTime, start, isRunning } = useTimer({
    initialTime: 120,
    autoStart: false,
    onTimeChange: (timeLeft) => {
      if (timeLeft === 60) toast.error('You have 1 minute left');
    },
    onTimerEnd: onTestEnd
  });

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  if (!listening) return;

  const onAudioPartEnds = () => {
    if (currentAudioIndex === null) return;
    if (currentAudioIndex === audios.length - 1) {
      toast.info('You have 2 minutes to check your answers');
      start();
      setCurrentAudioIndex(null);
      return;
    }
    setCurrentAudioIndex(currentAudioIndex + 1);
    audioRef.current?.play();
  };

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
    for (let i = firstQuestionId; i < lastQuestionId; i++) {
      if (listening[i]) count++;
    }
    return count;
  };

  return (
    <div className='flex h-screen flex-col'>
      <header className='flex h-14 items-center justify-between border-b bg-background px-2 md:px-4'>
        <div className='flex items-center gap-6'>
          <span className='hidden text-lg font-semibold sm:block'>LISTENING</span>
        </div>
        <div className='flex justify-end gap-4'>
          <div
            className={cn(
              'flex h-9 items-center rounded-md bg-secondary px-3 font-medium sm:text-lg',
              { 'text-yellow-500': timeLeft <= 120 },
              { 'text-destructive': timeLeft <= 60 },
              { hidden: !isRunning }
            )}
          >
            {leftFullTime()}
          </div>
          <div className='flex items-center gap-2'>
            <VolumeXIcon aria-hidden='true' className='shrink-0 opacity-60' size={16} />
            <Slider
              aria-label='Volume slider'
              className='w-20'
              defaultValue={[volume]}
              max={1}
              min={0}
              step={0.01}
              onValueChange={([value]) => onVolumeChange(value)}
            />
            <Volume2Icon aria-hidden='true' className='shrink-0 opacity-60' size={16} />
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
      {currentAudioIndex !== null && (
        <audio
          ref={audioRef}
          src={audios[currentAudioIndex]}
          autoPlay
          onEnded={onAudioPartEnds}
          onPause={() => audioRef.current?.play()}
        ></audio>
      )}
      <BaseLayout className='min-w-0 flex-1 overflow-y-auto'>
        {test.parts.map((part, index) => {
          const currentQuestionStartNumber = questionsOrder;
          questionsOrder += part.question.numberOfQuestions;
          return (
            <div key={part.id} className={cn('hidden h-full', index + 1 === currentTab && 'block')}>
              <FormBuilder
                answers={listening}
                setAnswer={setListening}
                focus={currentFocusQuestionId}
                onFocusChange={(id) => setCurrentFocusQuestionId(id)}
                questions={part.question.content}
                questionsStartNumber={currentQuestionStartNumber}
              />
            </div>
          );
        })}
      </BaseLayout>
      <div className='relative flex h-14 items-center justify-between'>
        {test.parts.map((part, index) => {
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
                  const questionId = index * 10 + i + 1;
                  return (
                    <div key={questionId} className='relative space-y-1'>
                      <div
                        className={cn('absolute bottom-full h-1 w-full rounded-sm bg-muted', {
                          'bg-green-500': !!listening[questionId]
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
    </div>
  );
};
