import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import { Highlightable } from '@/components/Highlightable';
import { ListeningTest, ReadingTest, WritingTest } from '@/components/tests';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Spinner
} from '@/components/ui';
import { useFullscreen } from '@/hooks';
import { getMockByCode } from '@/utils/api/requests';

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

  const ieltsSteps: Record<IeltsTestType, React.ReactNode> = {
    listening: (
      <ListeningTest
        nextStep={functions.getNextStep('listening')}
        test={state.exam.listening}
        hideNextButton
        onTestEnd={functions.moveToNextStep}
        onVolumeChange={setVolume}
        volume={volume}
      />
    ),
    reading: (
      <ReadingTest
        nextStep={functions.getNextStep('reading')}
        test={state.exam.reading}
        hideNextButton
        onTestEnd={functions.moveToNextStep}
      />
    ),
    writing: (
      <WritingTest
        nextStep={functions.getNextStep('writing')}
        test={state.exam.writing}
        hideNextButton
        onTestEnd={functions.moveToNextStep}
      />
    )
  };

  return (
    <>
      <Highlightable>{ieltsSteps[state.currentStep]}</Highlightable>
      {!state.showSaveFailedDialog && state.isPending && (
        <div className='fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/50 backdrop-blur-sm'>
          <Spinner className='size-8' />
          <p className='text-lg font-medium'>Saving your test…</p>
        </div>
      )}
      <AlertDialog open={state.showSaveFailedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Automatic Saving Failed</AlertDialogTitle>
            <AlertDialogDescription>
              We could not save automatically. Please, try to save manually by clicking the button
              below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button disabled={state.isPending} onClick={functions.retrySave}>
              {state.isPending ? 'Saving…' : 'Try Again'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const Route = createFileRoute('/exam/$id/')({
  component: WritingTestPage,
  pendingComponent: () => (
    <div className='flex h-svh items-center justify-center'>
      <Spinner className='size-10' />
    </div>
  ),
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.prefetchQuery({
      queryKey: ['mocks', id],
      queryFn: () => getMockByCode({ config: { params: { code: id } } })
    })
});
