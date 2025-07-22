import { createFileRoute, redirect } from '@tanstack/react-router';
import React from 'react';

import { Highlightable } from '@/components/Highlightable';
import { ListeningTest, ReadingTest, WritingTest } from '@/components/tests';
import { Spinner } from '@/components/ui';
import { useFullscreen } from '@/hooks';
import { ResultsDialog } from '@/routes/exam/admin/$id/-components/ResultsDialog.tsx';
import { getMockSolveId } from '@/utils/api/requests';
import { useAuthStore } from '@/utils/stores';

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
    listening: (
      <ListeningTest
        nextStep={functions.getNextStep('listening')}
        test={state.exam.listening}
        onTestEnd={functions.moveToNextStep}
        onVolumeChange={setVolume}
        volume={volume}
      />
    ),
    reading: (
      <ReadingTest
        nextStep={functions.getNextStep('reading')}
        test={state.exam.reading}
        onTestEnd={functions.moveToNextStep}
      />
    ),
    writing: (
      <WritingTest
        nextStep={functions.getNextStep('writing')}
        test={state.exam.writing}
        onTestEnd={functions.moveToNextStep}
      />
    )
  };

  return (
    <>
      <Highlightable>{ieltsSteps[state.currentStep]}</Highlightable>
      <ResultsDialog
        answers={state.results}
        onOpenChange={functions.setOpenResults}
        open={state.openResults}
      />
    </>
  );
};

export const Route = createFileRoute('/exam/admin/$id/')({
  component: WritingTestPage,
  pendingComponent: () => (
    <div className='flex h-svh items-center justify-center'>
      <Spinner className='size-10' />
    </div>
  ),
  beforeLoad: async ({ location }) => {
    if (!useAuthStore.getState().auth.accessToken) {
      throw redirect({
        to: '/login',
        replace: false,
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href
        }
      });
    }
  },
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.prefetchQuery({
      queryKey: ['mocksSolve', id],
      queryFn: () => getMockSolveId({ id })
    })
});
