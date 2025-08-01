export interface MatchingFeaturesQuestionValue {
  condition: string | null;
  content: string[];
  id: string;
  optionsTitle?: string | null;
  showOptions: boolean;
  title: string | null;
  type: 'matching-features';
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}
