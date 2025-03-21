type ReadingPartType = 'PART_1' | 'PART_2' | 'PART_3';
interface ReadingPart extends Part<ReadingPartType> {
  answers: Record<string, string>;
  passage: string;
}
type ReadingPartRequest = PartRequest<ReadingPartType> & {
  answers: Record<string, string>;
  passage: string;
};
type ReadingPartsResponse = Pagination<Part<ReadingPartType>>;
type ReadingPartResponse = ReadingPart;

interface ReadingTest extends Test {
  part1: ReadingPart | null;
  part2: ReadingPart | null;
  part3: ReadingPart | null;
  parts: ReadingPart[];
}
type ReadingTestRequest = TestRequest & {
  part1: number | null;
  part2: number | null;
  part3: number | null;
};
type ReadingTestsResponse = Pagination<Test>;
type ReadingTestResponse = ReadingTest;
