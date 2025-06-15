import { create } from 'zustand';

export interface ExamAnswersState {
  listening: Record<number, string> | null;
  reading: Record<number, string> | null;
  speaking: Record<number, string> | null;
  writing: Record<number, string> | null;
}

interface ExamAnswersActions {
  onExamEnd: () => void;
  onExamStart: (exam: Mock) => void;
  resetExamAnswers: () => void;
  setListening: (index: number, result: string) => void;
  setReading: (index: number, result: string) => void;
  setSpeaking: (index: number, result: string) => void;
  setWriting: (index: number, result: string) => void;
}

const defaultValues: ExamAnswersState = {
  listening: null,
  reading: null,
  speaking: null,
  writing: null
};

const getQuestionsCount = <T>(parts: Part<T>[]) =>
  parts.reduce((sum, acc) => sum + acc.question.numberOfQuestions, 0);

export const useExamAnswersStore = create<ExamAnswersState & ExamAnswersActions>((set) => ({
  ...defaultValues,
  setListening: (index, result) => {
    set((state) => ({
      listening: {
        ...state.listening,
        [index]: result
      }
    }));
  },
  setReading: (index, result) => {
    set((state) => ({
      reading: {
        ...state.reading,
        [index]: result
      }
    }));
  },
  setSpeaking: (index, result) => {
    set((state) => ({
      speaking: {
        ...state.speaking,
        [index]: result
      }
    }));
  },
  setWriting: (index, result) => {
    set((state) => ({
      writing: {
        ...state.writing,
        [index]: result
      }
    }));
  },
  resetExamAnswers: () => {
    set(() => defaultValues);
  },
  onExamStart: (exam) => {
    set(() => ({
      listening:
        exam.listening &&
        Object.fromEntries(
          [
            ...Array.from({
              length: getQuestionsCount(exam.listening.parts)
            })
          ].map((_, i) => [i + 1, ''])
        ),
      reading:
        exam.reading &&
        Object.fromEntries(
          [
            ...Array.from({
              length: getQuestionsCount(exam.reading.parts)
            })
          ].map((_, i) => [i + 1, ''])
        ),
      speaking:
        exam.speaking &&
        Object.fromEntries(
          [
            ...Array.from({
              length: getQuestionsCount(exam.speaking.parts)
            })
          ].map((_, i) => [i + 1, ''])
        ),
      writing:
        exam.writing &&
        Object.fromEntries(
          [
            ...Array.from({
              length: getQuestionsCount(exam.writing.parts)
            })
          ].map((_, i) => [i + 1, ''])
        )
    }));
  },
  onExamEnd: () => {
    set(() => defaultValues);
  }
}));
