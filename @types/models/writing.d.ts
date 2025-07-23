type WritingPartType = 'PART_1' | 'PART_2';
interface WritingPart extends Part<WritingPartType> {}
type WritingPartRequest = PartRequest<WritingPartType>;
type WritingPartsResponse = Pagination<Part<WritingPartType>>;
type WritingPartResponse = WritingPart;

interface WritingTest extends Test {
  parts: WritingPart[];
}
type WritingTestRequest = TestRequest & {
  part1: number | null;
  part2: number | null;
};
type WritingTestsResponse = Pagination<Test>;
type WritingTestResponse = WritingTest;
