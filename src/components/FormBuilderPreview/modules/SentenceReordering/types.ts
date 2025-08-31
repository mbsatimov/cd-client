export interface SentenceReorderingQuestionValue {
  condition: string | null;
  id: string;
  sentence: string;
  title: string | null;
  type: 'sentence-reordering';
}
