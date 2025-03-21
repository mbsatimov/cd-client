import { CircleAlertIcon, InfoIcon, Volume2Icon, VolumeXIcon } from 'lucide-react';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { Button, Slider } from '@/components/ui';
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle
} from '@/components/ui/stepper.tsx';

const stepsMap: Record<IeltsTestType, any> = {
  listening: {
    title: 'IELTS Listening',
    desc: 'Time: Approximately 30 minutes',
    instructions: {
      title: 'INSTRUCTIONS TO CANDIDATES',
      list: [
        'Answer <strong>all</strong> the questions.',
        'You can change your answers at any time during the test.'
      ]
    },
    information: {
      title: 'INFORMATION FOR CANDIDATES',
      list: [
        'There are 40 questions in this test.',
        'Each question carries one mark.',
        'There are four parts to the test.',
        'Please note you will only hear each part once in your actual test.',
        'For each part of the test there will be time for you to look through the questions and time for you to check your answers.'
      ]
    }
  },
  reading: {
    title: 'IELTS Listening',
    desc: 'Time: 1 hour',
    instructions: {
      title: 'INSTRUCTIONS TO CANDIDATES',
      list: [
        'Answer <strong>all</strong> the questions.',
        'You can change your answers at any time during the test.'
      ]
    },
    information: {
      title: 'INFORMATION FOR CANDIDATES',
      list: [
        'There are 40 questions in this test.',
        'Each question carries one mark.',
        'There are three parts to the test.',
        'The test clock will show you when there are 10 minutes and 5 minutes remaining.'
      ]
    }
  },
  writing: {
    title: 'IELTS Writing',
    desc: 'Time: 1 hour',
    instructions: {
      title: 'INSTRUCTIONS TO CANDIDATES',
      list: [
        'Answer <strong>both</strong> parts.',
        'You can change your answers at any time during the test.'
      ]
    },
    information: {
      title: 'INFORMATION FOR CANDIDATES',
      list: [
        'There are two parts in this test.',
        'Part 2 contributes twice as much as Part 1 to the writing score.',
        'The test clock will show you when there are 10 minutes and 5 minutes remaining.'
      ]
    }
  },
  speaking: ''
};

interface Props {
  currentStep: IeltsTestType;
  steps: IeltsTestType[];
  volume: number;
  onConfirm: () => void;
  onVolumeChange: (volume: number) => void;
}

export const TestConfirmStepper = ({
  steps,
  currentStep,
  onConfirm,
  volume,
  onVolumeChange
}: Props) => {
  const currentStepIndex = steps.findIndex((item) => item === currentStep);
  const [isSoundCheckConfirmed, setIsSoundCheckConfirmed] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause();
    }
  };

  if (!isSoundCheckConfirmed && currentStep === 'listening')
    return (
      <BaseLayout className='flex h-svh max-w-4xl flex-col justify-center space-y-10'>
        <div className='space-y-6 rounded-md border p-6'>
          <h2 className='text-xl font-bold'>Test sound</h2>
          <p>Put on your headphones and click on the Play sound button to play a sample sound.</p>
          <div className='flex items-center justify-center'></div>
          <div className='flex items-center justify-center gap-4'>
            <Button onClick={toggleAudio}>Play sound</Button>
            <audio src='/listening.mp3' />
            <div className='flex items-center gap-2'>
              <VolumeXIcon aria-hidden='true' className='shrink-0 opacity-60' size={16} />
              <Slider
                aria-label='Volume slider'
                className='w-20'
                max={1}
                min={0}
                step={0.01}
                value={[volume]}
                onValueChange={([value]) => onVolumeChange(value)}
              />
              <Volume2Icon aria-hidden='true' className='shrink-0 opacity-60' size={16} />
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <CircleAlertIcon className='size-4 shrink-0 text-destructive' />
            <p>If you cannot hear the sound clearly, please tell the invigilator.</p>
          </div>
          <div className='flex items-center justify-center'>
            <Button onClick={() => setIsSoundCheckConfirmed(true)}>Continue</Button>
          </div>
        </div>
      </BaseLayout>
    );

  return (
    <BaseLayout className='flex h-svh max-w-4xl flex-col justify-center space-y-10'>
      <div className='space-y-8'>
        <div>
          <h1 className='mb-4 text-xl font-bold'>{stepsMap[currentStep].title}</h1>
          <p dangerouslySetInnerHTML={{ __html: stepsMap[currentStep].desc }} />
        </div>
        <div>
          <h2 className='mb-4 text-xl font-bold'>{stepsMap[currentStep].instructions.title}</h2>
          <ul className='ml-10 list-outside list-disc space-y-2'>
            {stepsMap[currentStep].instructions.list.map((item: string) => (
              <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
        <div>
          <h2 className='mb-4 text-xl font-bold'>{stepsMap[currentStep].information.title}</h2>
          <ul className='ml-10 list-outside list-disc space-y-2 md:text-lg'>
            {stepsMap[currentStep].information.list.map((item: string) => (
              <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      </div>
      <div className='mt-14 flex flex-col items-center space-y-4'>
        <div className='inline-flex items-center gap-1'>
          <InfoIcon className='size-4 text-primary' />
          <p className='font-semibold'>
            Do not click &quot;Start test&quot; until you are told to do so.
          </p>
        </div>
        <Button size='lg' onClick={onConfirm}>
          Start test
        </Button>
      </div>
      <Stepper className='px-6' value={currentStepIndex + 1}>
        {steps.map((step, index) => (
          <StepperItem key={step} className='flex-1 last:flex-grow-0' step={index + 1}>
            <div className='relative inline-flex flex-col space-y-0.5'>
              <StepperIndicator />
              <StepperTitle className='absolute left-1/2 top-[130%] -translate-x-1/2'>
                {step[0].toUpperCase() + step.slice(1)}
              </StepperTitle>
            </div>
            {index + 1 < steps.length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>
    </BaseLayout>
  );
};
