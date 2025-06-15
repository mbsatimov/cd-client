export interface DraggableSelectionQuestionValue {
  condition: string | null;
  content: string;
  id: string;
  title: string | null;
  type: 'draggable-selection';
  options: {
    id: string;
    value: string;
  }[];
}
