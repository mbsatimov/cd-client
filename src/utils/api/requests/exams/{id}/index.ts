import { api } from '@/utils/api/instance.ts';

export const getExamById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<ExamResponse>(`exams/${id}`, config);
