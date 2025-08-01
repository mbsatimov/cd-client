export interface SelectionQuestionValue {
  condition: string | null;
  content: string;
  id: string;
  optionsTitle?: string | null;
  showOptions: boolean;
  title: string | null;
  type: 'selection';
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}
