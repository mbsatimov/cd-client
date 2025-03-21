import { api } from '@/utils/api/instance.ts';

export const getExams = (requestConfig?: RequestConfig) =>
  api.get<ExamsResponse>('exams', requestConfig?.config);
