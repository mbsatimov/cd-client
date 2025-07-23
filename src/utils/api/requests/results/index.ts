import { api } from '@/utils/api/instance';

export const getCDResults = (requestConfig?: RequestConfig) =>
  api.get<CDResultResponse>('cd/results', requestConfig?.config);

export const postMockResults = ({ data, config }: RequestConfig<MockResultRequest>) =>
  api.post('cd/results', data, config);
