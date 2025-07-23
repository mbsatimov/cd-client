interface CDOnline {
  createdAt: string;
  description: string | null;
  forCdi: boolean;
  id: number;
  listening: ListeningTest;
  reading: ReadingTest;
  title: string;
  updatedAt: string;
  writing: WritingTest;
}
type CDOnlineListResponse = Pagination<CDOnline>;
type CDOnlineResponse = CDOnline;

interface CDOnlineSolve extends Omit<CDOnline, 'listening' | 'reading' | 'writing'> {
  listening: ListeningTest | null;
  reading: ReadingTest | null;
  writing: WritingTest | null;
}
type CDOnlineSolveResponse = CDOnlineSolve;

interface CDOnlineResult {
  id: number;
  participantId: string;
  sections: CDOnlineType[];
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
  } | null;
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
  } | null;
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
  } | null;
}
interface CDOnlineResultRequest {
  listening: Record<number, string> | null;
  reading: Record<number, string> | null;
  writing: Record<number, string> | null;
}
type CDOnlineResultResponse = CDOnlineResult;

type CDOnlineType = 'LISTENING' | 'READING' | 'WRITING';

interface CDOnlineParticipation {
  createdAt: string;
  id: string;
  sections: CDOnlineType[];
}

type CDOnlineParticipationRequest = CDOnlineType[];

type CDOnlineParticipationListResponse = Pagination<CDOnlineParticipation>;
type CDOnlineParticipationResponse = CDOnlineParticipation;
