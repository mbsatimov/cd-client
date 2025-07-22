import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import React from 'react';

import { useFullscreen } from '@/hooks';
import { getMockByCode, postMockResults } from '@/utils/api/requests';
import { useExamAnswersStore } from '@/utils/stores';

import { Route } from '../index.tsx';

export const useExamIdPage = () => {
  const { id } = Route.useParams();
  const examAnswersStore = useExamAnswersStore();
  const { toggleFullscreen } = useFullscreen();
  const router = useRouter();
  const [testStartConfirmed, setTestStartConfirmed] = React.useState(false);
  const [countdown, setCountdown] = React.useState(3);

  const getMockByCodeQuery = useSuspenseQuery({
    queryKey: ['mocks', id],
    queryFn: () => getMockByCode({ config: { params: { code: id } } })
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

  const postResultMutation = useMutation({
    mutationFn: postMockResults,
    onSuccess: () => {
      toggleFullscreen(false);
      router.navigate({ to: '/exam/end', replace: true });
    },
    onError: () => {
      if (countdown <= 0) return;
      setCountdown(countdown - 1);
      postResultMutation.mutate({
        data: {
          listening: examAnswersStore.listening,
          reading: examAnswersStore.reading,
          writing: examAnswersStore.writing
        },
        config: { params: { code: id } }
      });
    }
  });

  const moveToNextStep = () => {
    const nextStep = getNextStep(currentStep);
    if (nextStep) {
      setTestStartConfirmed(false);
      setCurrentStep(nextStep);
    } else {
      postResultMutation.mutate({
        data: {
          listening: examAnswersStore.listening,
          reading: examAnswersStore.reading,
          writing: examAnswersStore.writing
        },
        config: { params: { code: id } }
      });
    }
  };

  return {
    state: {
      exam,
      isPending: postResultMutation.isPending,
      steps,
      currentStep,
      testStartConfirmed
    },
    functions: {
      getNextStep,
      moveToNextStep,
      setTestStartConfirmed
    }
  };
};
