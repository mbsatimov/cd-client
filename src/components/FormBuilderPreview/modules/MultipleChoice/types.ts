export interface MultipleChoiceQuestionValue {
  condition: string | null;
  id: string;
  title: string | null;
  type: 'multiple-choice';
  questions: {
    id: string;
    question: string;
    options: {
      id: string;
      value: string;
      label: string;
    }[];
  }[];
}
