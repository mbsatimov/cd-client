import { Volume1Icon, Volume2Icon } from 'lucide-react';
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
import { useFullscreen } from '@/hooks';

import { stepsMap } from './data.ts';

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
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);
  const [playVideo, setPlayVideo] = React.useState(false);
  const { toggleFullscreen } = useFullscreen();

  React.useEffect(() => {
    if (currentStep === 'listening') {
      if (isSoundCheckConfirmed) {
        setPlayVideo(true);
      }
    } else {
      setPlayVideo(true);
    }
  }, [isSoundCheckConfirmed]);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleAudio = () => {
    if (audioRef.current) {
      audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause();
      setIsAudioPlaying(!audioRef.current.paused);
    }
  };

  const onVideoEnded = () => {
    setPlayVideo(false);
  };

  const onSoundCheckConfirmed = () => {
    toggleFullscreen(true);
    setIsSoundCheckConfirmed(true);
  };

  if (playVideo) {
    return (
      <div className='fixed inset-0 z-50 flex'>
        <video className='size-full object-contain' autoPlay onEnded={onVideoEnded}>
          <source src={`/videos/${currentStep}.mp4`} type='video/mp4' />
        </video>
      </div>
    );
  }

  if (!isSoundCheckConfirmed && currentStep === 'listening')
    return (
      <BaseLayout className='flex h-svh max-w-4xl flex-col justify-center space-y-10'>
        <div className='space-y-6 rounded-md border p-6'>
          <h2 className='text-xl font-bold'>Test sound</h2>
          <p>Put on your headphones and click on the Play sound button to play a sample sound.</p>
          <div className='flex items-center justify-center'></div>
          <div className='flex items-center justify-center gap-4'>
            <Button onClick={toggleAudio}>{isAudioPlaying ? 'Pause sound' : 'Play sound'}</Button>
            <audio
              ref={audioRef}
              src='/volumeCheckAudio.mp3'
              onEnded={() => setIsAudioPlaying(false)}
            />
            <div className='flex items-center gap-1'>
              <Button
                disabled={volume <= 0}
                size='iconSm'
                variant='ghost'
                onClick={() => onVolumeChange(volume - 0.1 <= 0 ? 0 : volume - 0.1)}
              >
                <Volume1Icon aria-hidden='true' className='shrink-0 opacity-60' size={16} />
              </Button>
              <Slider
                aria-label='Volume slider'
                className='w-20'
                max={1}
                min={0}
                step={0.01}
                value={[volume]}
                onValueChange={([value]) => onVolumeChange(value)}
              />
              <Button
                disabled={volume >= 1}
                size='iconSm'
                variant='ghost'
                onClick={() => onVolumeChange(volume + 0.1 >= 1 ? 1 : volume + 0.1)}
              >
                <Volume2Icon aria-hidden='true' className='shrink-0 opacity-60' size={16} />
              </Button>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <Button onClick={onSoundCheckConfirmed}>Continue</Button>
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
