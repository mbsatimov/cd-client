import { api } from '@/utils/api/instance.ts';

export const getMockByCode = (requestConfig?: RequestConfig) =>
  api.get<MockResponse>('mock/by-code', requestConfig?.config);

export const getMockSolveId = ({ config, id }: RequestConfig & { id: number | string }) =>
  api.get<MockResponse>(`dashboard/mock/solve/${id}`, config);

export const postMockSolveId = ({
  config,
  id,
  data
}: RequestConfig<MockResultRequest> & { id: number | string }) =>
  api.post<CDResult>(`mock/check-result/${id}`, data, config);
