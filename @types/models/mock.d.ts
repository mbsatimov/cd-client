type MockType = 'CD_OFFLINE' | 'CD_ONLINE';
interface Mock {
  createdAt: string;
  createdBy: User;
  description: string | null;
  id: number;
  listening: ListeningTest;
  participants: Participant[];
  reading: ReadingTest;
  speaking: SpeakingTest;
  title: string;
  type: MockType;
  updatedAt: string;
  updatedBy: User;
  writing: WritingTest;
  details: {
    startTime: string;
    endTime: string;
  } | null;
}
type MockRequest = Pick<Mock, 'description' | 'details' | 'title' | 'type'> & {
  listeningId?: number;
  readingId?: number;
  speakingId?: number;
  writingId?: number;
};
type MocksResponse = Pagination<Mock>;
type MockResponse = Mock;

interface MockResultRequest {
  listening: Record<number, string> | null;
  reading: Record<number, string> | null;
  writing: Record<number, string> | null;
}
