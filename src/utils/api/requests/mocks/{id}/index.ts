import { api } from '@/utils/api/instance.ts';

export const getMockByCode = (requestConfig?: RequestConfig) =>
  api.get<MockResponse>('mock/by-code', requestConfig?.config);
