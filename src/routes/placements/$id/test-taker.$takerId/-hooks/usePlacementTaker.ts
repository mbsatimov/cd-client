'use client';

import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import React, { useState } from 'react';

import { getPlacementTestsById, postPlacementTestResult } from '@/utils/api/requests';

export const usePlacementTaker = () => {
  const { id, takerId } = useParams({ from: '/placements/$id/test-taker/$takerId/' });
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questionResults, setQuestionResults] = React.useState<PlacementQuestionResults | null>(
    null
  );

  const onAnswerChange = (index: number, result: string) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [index]: result }));
  };

  const { data } = useSuspenseQuery({
    queryKey: ['placement', id],
    queryFn: () => getPlacementTestsById({ id })
  });

  const questions = data.data.questions;

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const currentQuestion = questions[questionIndex];

  const postPlacementTestResultMutation = useMutation({
    mutationFn: postPlacementTestResult,
    onSuccess: ({ data }) => {
      setQuestionResults(data);

      // If the question is failed, we can determine the student's level here
      if (!data.isPassed) {
        // This would be where you implement your level determination logic
        // based on how far they got in the assessment
      }
    }
  });

  const isCompleted = questions.length === questionIndex + 1;

  const onSubmitQuestion = () => {
    postPlacementTestResultMutation.mutate({
      id: takerId,
      data: answers,
      config: {
        params: { questionId: currentQuestion.id }
      }
    });
  };

  const onNextQuestion = () => {
    if (isCompleted) return;
    setQuestionIndex((prevIndex) => prevIndex + 1);
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
      questions
    },
    functions: {
      onAnswerChange,
      onSubmitQuestion,
      onNextQuestion
    }
  };
};
