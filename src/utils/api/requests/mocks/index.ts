import { api } from '@/utils/api/instance.ts';

export const getMocks = (requestConfig?: RequestConfig) =>
  api.get<MocksResponse>('mock', requestConfig?.config);
