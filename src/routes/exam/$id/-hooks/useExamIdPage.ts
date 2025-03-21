import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import React from 'react';

import { useFullscreen } from '@/hooks';
import { getMockByCode, postMockResults } from '@/utils/api/requests';
import { useExamAnswersStore } from '@/utils/stores';

import { Route } from '../index.lazy.tsx';

export const useExamIdPage = () => {
  const { id } = Route.useParams();
  const examAnswersStore = useExamAnswersStore();
  const { toggleFullscreen } = useFullscreen();
  const router = useRouter();
  const [testStartConfirmed, setTestStartConfirmed] = React.useState(false);

  const [currentStep, setCurrentStep] = React.useState<IeltsTestType | null>(null);

  const getMockByCodeQuery = useQuery({
    queryKey: ['mocks', id],
    queryFn: () => getMockByCode({ config: { params: { code: id } } })
  });

  const steps: IeltsTestType[] = React.useMemo(
    () =>
      (['listening', 'reading', 'writing'] as IeltsTestType[]).filter(
        (step) => getMockByCodeQuery.data?.data?.[step]
      ),
    [getMockByCodeQuery.data?.data]
  );

  React.useEffect(() => {
    if (!getMockByCodeQuery.isSuccess) return;
    setCurrentStep(steps[0]);
    examAnswersStore.onExamStart(getMockByCodeQuery.data?.data);
    toggleFullscreen(true);
  }, [getMockByCodeQuery.isSuccess]);

  const getNextStep = (currentStep: IeltsTestType) => {
    const currentIndex = steps.indexOf(currentStep);
    return currentIndex !== -1 && currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
  };

  const postResultMutation = useMutation({
    mutationFn: postMockResults,
    onSuccess: () => {
      toggleFullscreen(false);
      router.navigate({ to: '/exam/end', replace: true });
    }
  });

  const moveToNextStep = () => {
    const nextStep = getNextStep(currentStep as IeltsTestType);
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
      isLoading: getMockByCodeQuery.isLoading,
      isSuccess: getMockByCodeQuery.isSuccess,
      exam: getMockByCodeQuery.data?.data,
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
