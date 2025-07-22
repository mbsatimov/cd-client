import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';

import { useFullscreen } from '@/hooks';
import { getMockSolveId, postMockSolveId } from '@/utils/api/requests';
import { useExamAnswersStore } from '@/utils/stores';

import { Route } from '../index.tsx';

export const useExamIdPage = () => {
  const { id } = Route.useParams();
  const examAnswersStore = useExamAnswersStore();
  const { toggleFullscreen } = useFullscreen();
  const [testStartConfirmed, setTestStartConfirmed] = React.useState(false);
  const [openResults, setOpenResults] = React.useState(false);
  const [results, setResults] = React.useState<CDResult>();

  const getMockByCodeQuery = useSuspenseQuery({
    queryKey: ['mocksSolve', id],
    queryFn: () => getMockSolveId({ id })
  });

  const exam = getMockByCodeQuery.data.data;

  const steps = (['listening', 'reading', 'writing'] as IeltsTestType[]).filter(
    (step) => exam[step]
  );

  const [currentStep, setCurrentStep] = React.useState<IeltsTestType>(steps[0]);

  React.useEffect(() => {
    examAnswersStore.onExamStart(exam);
    toggleFullscreen(true);
  }, []);

  const getNextStep = (currentStep: IeltsTestType) => {
    const currentIndex = steps.indexOf(currentStep);
    return currentIndex !== -1 && currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
  };

  const postMockSolveIdMutation = useMutation({
    mutationFn: postMockSolveId,
    onSuccess: (res) => {
      toggleFullscreen(false);
      setResults(res.data);
      setOpenResults(true);
    }
  });

  const moveToNextStep = () => {
    const nextStep = getNextStep(currentStep);
    if (nextStep) {
      setTestStartConfirmed(false);
      setCurrentStep(nextStep);
    } else {
      postMockSolveIdMutation.mutate({
        id,
        data: {
          listening: examAnswersStore.listening,
          reading: examAnswersStore.reading,
          writing: examAnswersStore.writing
        }
      });
    }
  };

  return {
    state: {
      exam,
      isPending: postMockSolveIdMutation.isPending,
      steps,
      currentStep,
      testStartConfirmed,
      results,
      openResults
    },
    functions: {
      getNextStep,
      moveToNextStep,
      setCurrentStep,
      setOpenResults,
      setTestStartConfirmed
    }
  };
};
