import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import { Highlightable } from '@/components/Highlightable';
import { ListeningTest, ReadingTest, WritingTest } from '@/components/tests';
import { Spinner } from '@/components/ui';
import { useFullscreen } from '@/hooks';
import { ResultsDialog } from '@/routes/exam/admin/$id/-components/ResultsDialog.tsx';
import { getMockSolveId } from '@/utils/api/requests';

import { TestConfirmStepper } from './-components';
import { useExamIdPage } from './-hooks';

const WritingTestPage = () => {
  const { state, functions } = useExamIdPage();
  const [volume, setVolume] = React.useState(0.75);
  const { toggleFullscreen } = useFullscreen();

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

  const ieltsSteps: Record<IeltsTestType, React.ReactNode | null> = {
    listening: state.exam?.listening && (
      <ListeningTest
        nextStep={functions.getNextStep('listening')}
        test={state.exam.listening}
        onTestEnd={functions.moveToNextStep}
        onVolumeChange={setVolume}
        volume={volume}
      />
    ),
    reading: state.exam?.reading && (
      <ReadingTest
        nextStep={functions.getNextStep('reading')}
        test={state.exam.reading}
        onTestEnd={functions.moveToNextStep}
      />
    ),
    writing: state.exam?.writing && (
      <WritingTest
        nextStep={functions.getNextStep('writing')}
        test={state.exam.writing}
        onTestEnd={functions.moveToNextStep}
      />
    ),
    speaking: state.exam?.speaking && <div>Speaking test</div>
  };

  return (
    <Highlightable>
      {state.currentStep && ieltsSteps[state.currentStep]}
      <ResultsDialog
        answers={state.results}
        onOpenChange={functions.setOpenResults}
        open={state.openResults}
      />
    </Highlightable>
  );
};

export const Route = createFileRoute('/exam/admin/$id/')({
  component: WritingTestPage,
  pendingComponent: () => (
    <div className='flex h-svh items-center justify-center'>
      <Spinner className='size-10' />
    </div>
  ),
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.prefetchQuery({
      queryKey: ['mocksSolve', id],
      queryFn: () => getMockSolveId({ id })
    })
});
