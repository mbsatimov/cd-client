import type { FormBuilderQuestionTypes } from '@/components/FormBuilderPreview/types';

export const helpDataMap: Record<FormBuilderQuestionTypes, string> = {
  completion: 'Use TAB to navigate between the inputs. Your answer is saved continuously.',
  'multiple-choice':
    'Use TAB to navigate between the options. Option can be selected using the arrow keys or by pressing enter or space. Your answer is saved continuously.',
  selection:
    'Use TAB to navigate between the options. Press enter or space to see options. Your answer is saved continuously.',
  'multi-select':
    'Use TAB to navigate between the checkbox elements. Option can be selected by pressing enter or space. Your answer is saved continuously.',
  'draggable-selection':
    'Use TAB to navigate between the draggable elements. The active element can be moved between open gaps using the arrow keys. Your answer is saved continuously.',
  'matching-features':
    'Use TAB to navigate between items. Option can be selected by pressing enter or space. Your answer is saved continuously.'
};
