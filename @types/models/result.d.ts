interface CDResult {
  id: number;
  listeningResult: {
    overallScore: number;
    part1: number;
    part2: number;
    part3: number;
    part4: number;
    correctAnswers: number;
    answers: [
      {
        number: number;
        userAnswer: string;
        correctAnswer: string[];
        isCorrect: boolean;
      }
    ];
  };
  readingResult: {
    overallScore: number;
    part1: number;
    part2: number;
    part3: number;
    correctAnswers: number;
    answers: [
      {
        number: number;
        userAnswer: string;
        correctAnswer: string[];
        isCorrect: boolean;
      }
    ];
  };
  speakingResult: {
    overallScore: number;
    part1: number;
    part2: number;
    part3: number;
    part4: number;
  };
  writingResult: {
    overallScore: number;
    task1OverallScore: number;
    task2OverallScore: number;
    part1: number;
    part2: number;
    part3: number;
    part4: number;
    part5: number;
    part6: number;
    part7: number;
    part8: number;
    answers: Record<string, string>;
    question: WritingTest;
  };
}
type CDResultResponse = CDResult;

interface PaperResult {
  id: number;
  listeningResult: {
    overallScore: number;
    files: ApiFile[];
    part1: number;
    part2: number;
    part3: number;
    part4: number;
  };
  readingResult: {
    overallScore: number;
    files: ApiFile[];
    part1: number;
    part2: number;
    part3: number;
    part4: number;
  };
  speakingResult: {
    overallScore: number;
    files: ApiFile[];
    part1: number;
    part2: number;
    part3: number;
    part4: number;
  };
  writingResult: {
    overallScore: number;
    task1OverallScore: number;
    task2OverallScore: number;
    files: ApiFile[];
    part1: number;
    part2: number;
    part3: number;
    part4: number;
    part5: number;
    part6: number;
    part7: number;
    part8: number;
  };
}
type PaperResultResponse = PaperResult;
