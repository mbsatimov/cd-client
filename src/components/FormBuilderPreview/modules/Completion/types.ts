export interface CompletionQuestionValue {
  condition: string | null;
  content: string;
  id: string;
  title: string | null;
  type: 'completion';
}
