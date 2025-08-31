import type { CompletionQuestionValue } from './modules/Completion';
import type { DraggableSelectionQuestionValue } from './modules/DraggableSelection';
import type { MatchingFeaturesQuestionValue } from './modules/MatchingFeatures';
import type { MultipleChoiceQuestionValue } from './modules/MultipleChoice';
import type { MultiSelectQuestionValue } from './modules/MultiSelect';
import type { SelectionQuestionValue } from './modules/Selection';
import type { SentenceReorderingQuestionValue } from './modules/SentenceReordering';

type EnforceType<T extends { id: string; type: string }> = T;

export type FormBuilderValue = EnforceType<
  | CompletionQuestionValue
  | DraggableSelectionQuestionValue
  | MatchingFeaturesQuestionValue
  | MultipleChoiceQuestionValue
  | MultiSelectQuestionValue
  | SelectionQuestionValue
  | SentenceReorderingQuestionValue
>;

export type FormBuilderQuestionTypes = FormBuilderValue['type'];
