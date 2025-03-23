import { createLazyFileRoute } from '@tanstack/react-router';
import React from 'react';

import { Highlightable } from '@/components/Highlightable';
import { ListeningTest, ReadingTest, WritingTest } from '@/components/tests';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Spinner
} from '@/components/ui';

import { TestConfirmStepper } from './-components';
import { useExamIdPage } from './-hooks';

const WritingTestPage = () => {
  const { state, functions } = useExamIdPage();
  const [open, setOpen] = React.useState(false);
  const [volume, setVolume] = React.useState(0.75);

  if (state.isLoading)
    return (
      <div className='flex h-svh items-center justify-center'>
        <Spinner className='size-10' />
      </div>
    );

  if (!state.isSuccess)
    return (
      <div className='flex h-svh items-center justify-center'>
        <p className='text-muted-foreground'>Exam not found</p>
      </div>
    );

  if (!state.testStartConfirmed && state.currentStep) {
    return (
      <TestConfirmStepper
        currentStep={state.currentStep}
        steps={state.steps}
        onConfirm={() => functions.setTestStartConfirmed(true)}
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
    <>
      <Highlightable>{state.currentStep && ieltsSteps[state.currentStep]}</Highlightable>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Test is ended</DialogTitle>
            <DialogDescription>Move to next step</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={functions.moveToNextStep}>Move to next step</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const Route = createLazyFileRoute('/exam/$id/')({
  component: WritingTestPage
});
