import { createFileRoute, Link } from '@tanstack/react-router';
import React from 'react';

import { Highlightable } from '@/components/Highlightable';
import { ListeningTest, ReadingTest, WritingTest } from '@/components/tests';
import { Button, Spinner } from '@/components/ui';
import { useFullscreen } from '@/hooks';

import { TestConfirmStepper } from './-components';
import { useExamIdPage } from './-hooks';

const WritingTestPage = () => {
  const { id } = Route.useParams();
  const { state, functions } = useExamIdPage();
  const [volume, setVolume] = React.useState(0.75);
  const { toggleFullscreen } = useFullscreen();

  if (state.steps.length === 0) {
    return (
      <div className='flex h-svh flex-col items-center justify-center'>
        <p className='mb-4 text-lg font-medium md:pb-6 md:text-xl'>
          The test is already completed.
        </p>
        <Button asChild>
          <Link params={{ id }} to='/online/$id'>
            See results
          </Link>
        </Button>
      </div>
    );
  }

  if (!state.testStartConfirmed) {
    return (
      <TestConfirmStepper
        currentStep={state.currentStep}
        steps={state.steps}
        onConfirm={() => {
          toggleFullscreen(true);
          functions.setTestStartConfirmed(true);
        }}
        onVolumeChange={setVolume}
        volume={volume}
      />
    );
  }

  const ieltsSteps: Record<IeltsTestType, React.ReactNode> = {
    listening: state.exam.listening && (
      <ListeningTest
        nextStep={functions.getNextStep('listening')}
        test={state.exam.listening}
        onTestEnd={functions.moveToNextStep}
        onVolumeChange={setVolume}
        volume={volume}
      />
    ),
    reading: state.exam.reading && (
      <ReadingTest
        nextStep={functions.getNextStep('reading')}
        test={state.exam.reading}
        onTestEnd={functions.moveToNextStep}
      />
    ),
    writing: state.exam.writing && (
      <WritingTest
        nextStep={functions.getNextStep('writing')}
        test={state.exam.writing}
        onTestEnd={functions.moveToNextStep}
      />
    )
  };

  return <Highlightable>{ieltsSteps[state.currentStep]}</Highlightable>;
};

export const Route = createFileRoute('/exam/online/$id/')({
  component: WritingTestPage,
  pendingComponent: () => (
    <div className='flex h-svh items-center justify-center'>
      <Spinner className='size-10' />
    </div>
  )
});
