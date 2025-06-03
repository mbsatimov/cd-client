import { Volume2Icon, VolumeXIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { FormBuilder } from '@/components/FormBuilderPreview';
import { BaseLayout } from '@/components/layout';
import { Slider, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { useTimer } from '@/hooks';
import { cn } from '@/lib/utils.ts';
import { useExamAnswersStore } from '@/utils/stores';

import { FinishTestAction, MoveToAction } from '../components';

interface Props {
  nextStep: IeltsTestType | null;
  test: ListeningTest;
  volume: number;
  onTestEnd: () => void;
  onVolumeChange: (volume: number) => void;
}

export const ListeningTest = ({ test, nextStep, onTestEnd, onVolumeChange, volume = 1 }: Props) => {
  const [currentTab, setCurrentTab] = React.useState('part-1');
  const audios = test.parts.map((part) => part.audio.url);
  const [currentAudioIndex, setCurrentAudioIndex] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { listening, setListening } = useExamAnswersStore();

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

  return (
    <div>
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <header className='sticky inset-x-0 top-0 z-10 grid h-14 grid-cols-2 items-center border-b bg-background px-2 md:grid-cols-3 md:px-4'>
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
                {index + 1}
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
            {nextStep ? (
              <MoveToAction type={nextStep} onConfirm={onTestEnd} />
            ) : (
              <FinishTestAction onConfirm={onTestEnd} />
            )}
          </div>
        </header>
        <audio
          ref={audioRef}
          src={audios[currentAudioIndex]}
          autoPlay
          onEnded={onAudioPartEnds}
        ></audio>
        <BaseLayout>
          {test.parts.map((part, index) => {
            const currentQuestionStartNumber = questionsOrder;
            questionsOrder += part.question.numberOfQuestions;
            return (
              <TabsContent key={part.id} value={`part-${index + 1}`}>
                <FormBuilder
                  answers={listening}
                  setAnswer={setListening}
                  questions={part.question.content}
                  questionsStartNumber={currentQuestionStartNumber}
                />
              </TabsContent>
            );
          })}
        </BaseLayout>
      </Tabs>
    </div>
  );
};
