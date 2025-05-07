type PlacementQuestionLevel =
  | 'A1'
  | 'A2'
  | 'ADVANCED'
  | 'B1'
  | 'B2'
  | 'BEGINNER'
  | 'C1'
  | 'C2'
  | 'ELEMENTARY'
  | 'INTERMEDIATE'
  | 'PRE_INTERMEDIATE';

interface PlacementQuestion {
  answers: Record<string, string[]>;
  createdAt: string;
  description: string | null;
  id: number;
  level: PlacementQuestionLevel;
  passingScore: number;
  title: string;
  updatedAt: string | null;
  question: {
    id: number;
    content: any | any[];
    numberOfQuestions: number;
  };
}

interface PlacementQuestionRequest {
  answers: Record<string, string[]>;
  description: string | null;
  level: PlacementQuestionLevel;
  passingScore: number;
  title: string;
  question: {
    content: any | any[];
    numberOfQuestions: number;
  };
}

type PlacementTestsResponse = Pagination<PlacementTest>;
type PlacementTestResponse = PlacementTest;

interface PlacementTest extends Test {
  questions: PlacementQuestion[];
}

interface PlacementTestRequest {
  description: string | null;
  questionIds: number[];
  title: string;
}

type PlacementQuestionsResponse = Pagination<PlacementQuestion>;
type PlacementQuestionResponse = PlacementQuestion;

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
