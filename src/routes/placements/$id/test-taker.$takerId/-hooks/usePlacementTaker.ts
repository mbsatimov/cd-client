import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { getPlacementTestsById, postPlacementTestResult } from '@/utils/api/requests';

export const usePlacementTaker = () => {
  const { id, takerId } = useParams({ from: '/placements/$id/test-taker/$takerId/' });
  const { data } = useSuspenseQuery({
    queryKey: ['placement', id],
    queryFn: () => getPlacementTestsById({ id })
  });

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questionResults, setQuestionResults] = React.useState<PlacementQuestionResults | null>(
    null
  );
  const questions = data.data.questions;

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const currentQuestion = questions[questionIndex];

  const [openSkipQuestion, setOpenSkipQuestion] = React.useState(
    currentQuestion.skipQuestion.content.length > 0
  );

  const onSkipSkipQuestion = () => {
    setOpenSkipQuestion(false);
    setAnswers({});
  };

  const onAnswerChange = (index: number, result: string) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [index]: result }));
  };

  const postPlacementTestResultMutation = useMutation({
    mutationFn: postPlacementTestResult,
    onSuccess: ({ data }) => {
      if (data.isPassed) {
        setQuestionResults(data);
      } else {
        if (openSkipQuestion) {
          onSkipSkipQuestion();
          toast.error("You couldn't pass the skip question");
        } else {
          setQuestionResults(data);
        }
      }
    }
  });

  const isCompleted = questions.length === questionIndex + 1;

  const onSubmitQuestion = () => {
    postPlacementTestResultMutation.mutate({
      id: takerId,
      data: answers,
      config: {
        params: { questionId: currentQuestion.id, skipQuestion: openSkipQuestion }
      }
    });
  };

  const onNextQuestion = () => {
    if (isCompleted) return;
    setQuestionIndex((prevIndex) => prevIndex + 1);
    setOpenSkipQuestion(questions[questionIndex + 1].skipQuestion.content.length > 0);
    setAnswers({});
    setQuestionResults(null);
  };

  return {
    state: {
      answers,
      isCompleted,
      currentQuestion,
      questionResults,
      isResultCheckPending: postPlacementTestResultMutation.isPending,
      currentStep: questionIndex + 1,
      questionIndex,
      questions,
      openSkipQuestion
    },
    functions: {
      onAnswerChange,
      onSubmitQuestion,
      onNextQuestion,
      onSkipSkipQuestion
    }
  };
};
