type SpeakingPartType = 'PART_1' | 'PART_2' | 'PART_3';
interface SpeakingPart extends Part<SpeakingPartType> {}
type SpeakingPartRequest = PartRequest<SpeakingPartType>;
type SpeakingPartsResponse = Pagination<Part<SpeakingPartType>>;
type SpeakingPartResponse = SpeakingPart;

interface SpeakingTest extends Test {
  part1: SpeakingPart | null;
  part2: SpeakingPart | null;
  part3: SpeakingPart | null;
  parts: SpeakingPart[];
}
type SpeakingTestRequest = TestRequest & {
  part1: number | null;
  part2: number | null;
  part3: number | null;
};
type SpeakingTestsResponse = Pagination<Test>;
type SpeakingTestResponse = SpeakingTest;
