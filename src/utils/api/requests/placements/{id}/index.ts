import { api } from '@/utils/api/instance.ts';

export const getPlacementTestsById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<PlacementTestResponse>(`placement-test/${id}`, config);
