import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { getPlacementTestByLeadId, postPlacementTestResult } from '@/utils/api/requests';

export const usePlacementTaker = () => {
  const { id } = useParams({ from: '/placement/$id/' });
  const { data } = useSuspenseQuery({
    queryKey: ['placement', id],
    queryFn: () => getPlacementTestByLeadId({ id })
  });

  const [questionResults, setQuestionResults] = React.useState<PlacementQuestionResults | null>(
    null
  );
  const questions = data.data.questions;

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const currentQuestion = questions[questionIndex];

  const [openSkipQuestion, setOpenSkipQuestion] = React.useState(
    currentQuestion.skipQuestion.content.length > 0
  );

  const [answers, setAnswers] = useState<Record<number, string>>(
    Object.fromEntries(
      [
        ...Array.from({
          length:
            currentQuestion.skipQuestion.content.length > 0
              ? currentQuestion.skipQuestion.numberOfQuestions
              : currentQuestion.question.numberOfQuestions
        })
      ].map((_, i) => [i + 1, ''])
    )
  );

  const onSkipSkipQuestion = () => {
    setOpenSkipQuestion(false);
    setAnswers(
      Object.fromEntries(
        [
          ...Array.from({
            length: currentQuestion.question.numberOfQuestions
          })
        ].map((_, i) => [i + 1, ''])
      )
    );
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
      id,
      data: answers,
      config: {
        params: { questionId: currentQuestion.id, skipQuestion: openSkipQuestion }
      }
    });
  };

  const onNextQuestion = () => {
    if (isCompleted) return;
    setQuestionIndex((prevIndex) => prevIndex + 1);
    const nextQuestion = questions[questionIndex + 1];
    setOpenSkipQuestion(nextQuestion.skipQuestion.content.length > 0);
    setAnswers(
      Object.fromEntries(
        [
          ...Array.from({
            length:
              nextQuestion.skipQuestion.content.length > 0
                ? nextQuestion.skipQuestion.numberOfQuestions
                : nextQuestion.question.numberOfQuestions
          })
        ].map((_, i) => [i + 1, ''])
      )
    );
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
