type ListeningPartType = 'PART_1' | 'PART_2' | 'PART_3' | 'PART_4';
interface ListeningPart extends Part<ListeningPartType> {
  answers: Record<string, string[]>;
  audio: ApiFile;
}
type ListeningPartsResponse = Pagination<Part<ListeningPartType>>;
type ListeningPartResponse = ListeningPart;

interface ListeningTest extends Test {
  parts: ListeningPart[];
}
type ListeningTestsResponse = Pagination<Test>;
type ListeningTestResponse = ListeningTest;
