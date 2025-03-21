type ExamType = 'CD' | 'PAPER';
interface Exam {
  description: string | null;
  examDateTime: string;
  id: number;
  isOpen: boolean;
  location: string;
  locationUrl: string;
  price: number;
  priceForOurStudents: number;
  type: ExamType;
  speakingTimes: {
    id: number;
    time: string;
  }[];
}
type ExamsResponse = Pagination<Exam>;
type ExamResponse = Exam;
