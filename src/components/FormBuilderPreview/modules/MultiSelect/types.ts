export interface MultiSelectQuestionValue {
  condition: string | null;
  id: string;
  limit: number;
  title: string | null;
  type: 'multi-select';
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}
