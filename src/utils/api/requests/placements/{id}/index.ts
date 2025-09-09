import { api } from '@/utils/api/instance.ts';

export const getPlacementTestByLeadId = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<PlacementTestResponse>(`placement-test-by-lead-id/${id}`, config);

export const postPlacementTestTakerByLeadId = ({ config }: RequestConfig) =>
  api.post<number>('placement-test/result/test-taker-by-lead-id', undefined, config);
