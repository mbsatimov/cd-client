import type { FormBuilderValue } from '@/components/FormBuilderPreview/types.d.ts';

export const generateId = () => Math.random().toString(36).slice(2);

export const getQuestionCount = (question: FormBuilderValue) => {
  if (question.type === 'completion') {
    return question.content.split('@@').length - 1;
  } else if (question.type === 'selection') {
    return question.content.split('@@').length - 1;
  } else if (question.type === 'multiple-choice') {
    return question.questions.length;
  } else if (question.type === 'multi-select') {
    return question.limit;
  } else if (question.type === 'draggable-selection') {
    return question.content.split('@@').length - 1;
  } else if (question.type === 'matching-features') {
    return question.content.length;
  } else if (question.type === 'sentence-reordering') {
    return 1;
  }
  return 0;
};

export const getQuestionsCount = (questions: FormBuilderValue[]) => {
  let count = 0;
  questions.forEach((question) => {
    count += getQuestionCount(question);
  });
  return count;
};

export const getTestQuestionsCount = <T>(parts: Part<T>[]) => {
  let count = 0;
  parts.forEach((part) => {
    count += getQuestionsCount(part.question.content);
  });
  return count;
};
