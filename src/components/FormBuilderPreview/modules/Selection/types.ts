export interface SelectionQuestionValue {
  condition: string | null;
  content: string;
  id: string;
  showOptions: boolean;
  title: string | null;
  type: 'selection';
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}
