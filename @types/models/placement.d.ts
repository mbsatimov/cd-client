type PlacementQuestionLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

interface PlacementQuestion {
  answers: Record<string, string[]>;
  createdAt: string;
  description: string | null;
  id: number;
  level: PlacementQuestionLevel;
  passingScore: number;
  skipQuestionAnswers: Record<string, string[]>;
  title: string;
  updatedAt: string | null;
  question: {
    id: number;
    content: any | any[];
    numberOfQuestions: number;
  };
  skipQuestion: {
    id: number;
    content: any | any[];
    numberOfQuestions: number;
  };
  speakingQuestions: {
    question: string;
    satisfactoryAnswer: string;
    unsatisfactoryAnswer: string;
  }[];
}

type PlacementTestsResponse = Pagination<PlacementTest>;
type PlacementTestResponse = PlacementTest;

interface PlacementTest extends Test {
  questions: PlacementQuestion[];
}

interface PlacementTestTakerRequest {
  fullName: string;
  phoneNumber: string;
}

interface PlacementTestTakerResponse {
  fullName: string;
  id: number;
  phoneNumber: string;
}

interface PlacementQuestionResults {
  isPassed: boolean;
  numberOfCorrectAnswers: number;
  numberOfQuestions: number;
  passingScore: number;
}
