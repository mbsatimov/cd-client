import { api } from '@/utils/api/instance';

export const getPlacementTests = (requestConfig?: RequestConfig) =>
  api.get<PlacementTestsResponse>('dashboard/placement-test', requestConfig?.config);

export const postPlacementTestTaker = ({
  data,
  config
}: RequestConfig<PlacementTestTakerRequest>) =>
  api.post<PlacementTestTakerResponse>('placement-test/result/test-taker', data, config);

export const postPlacementTestResult = ({
  id,
  data,
  config
}: RequestConfig<Record<string, string>> & { id: number | string }) =>
  api.post<PlacementQuestionResults>(`placement-test/result/${id}`, data, config);
