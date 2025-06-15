import { ArrowLeftIcon, ArrowRightIcon, Volume2Icon, VolumeXIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { FormBuilder } from '@/components/FormBuilderPreview';
import { BaseLayout } from '@/components/layout';
import { Button, Slider, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
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
  const [currentTab, setCurrentTab] = React.useState('part-1');
  const audios = test.parts.map((part) => part.audio.url);
  const [currentAudioIndex, setCurrentAudioIndex] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { listening, setListening } = useExamAnswersStore();
  const [currentFocusQuestionId, setCurrentFocusQuestionId] = React.useState<number>(1);

  const { timeLeft, leftFullTime, start, isRunning } = useTimer({
    initialTime: 120,
    autoStart: false,
    onTimerEnd: onTestEnd
  });

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  if (!listening) return;

  const onAudioPartEnds = () => {
    if (currentAudioIndex === audios.length - 1) {
      toast.info('You have 2 minutes to check your answers');
      start();
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
      <header className='grid h-14 grid-cols-2 items-center border-b bg-background px-2 md:grid-cols-3 md:px-4'>
        <div className='flex items-center gap-6'>
          <span className='hidden text-lg font-semibold sm:block'>LISTENING</span>
          <div
            className={cn(
              'flex h-9 items-center rounded-md bg-secondary px-3 font-medium sm:text-lg',
              { 'text-yellow-500': timeLeft <= 600 },
              { 'text-destructive': timeLeft <= 60 },
              { hidden: !isRunning }
            )}
          >
            {leftFullTime()}
          </div>
        </div>
        <TabsList className='justify-self-start md:justify-self-stretch'>
          {test.parts.map((part, index) => (
            <TabsTrigger key={part.id} value={`part-${index + 1}`}>
              Part {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className='flex justify-end gap-4'>
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
          {!hideNextButton &&
            (nextStep ? (
              <MoveToAction type={nextStep} onConfirm={onTestEnd} />
            ) : (
              <FinishTestAction onConfirm={onTestEnd} />
            ))}
        </div>
      </header>
      <audio
        ref={audioRef}
        src={audios[currentAudioIndex]}
        autoPlay
        onEnded={onAudioPartEnds}
      ></audio>
      <BaseLayout className='min-w-0 flex-1 overflow-y-auto'>
        {test.parts.map((part, index) => {
          const currentQuestionStartNumber = questionsOrder;
          questionsOrder += part.question.numberOfQuestions;
          return (
            <TabsContent key={part.id} tabIndex={undefined} value={`part-${index + 1}`}>
              <FormBuilder
                answers={listening}
                setAnswer={setListening}
                focus={currentFocusQuestionId}
                onFocusChange={(id) => setCurrentFocusQuestionId(id)}
                questions={part.question.content}
                questionsStartNumber={currentQuestionStartNumber}
              />
            </TabsContent>
          );
        })}
      </BaseLayout>
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
                        'bg-green-500': !!listening[questionId]
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
