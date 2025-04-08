import { api } from '@/utils/api/instance.ts';

export const postFillBalance = (requestConfig?: RequestConfig) =>
  api.post<string>('/pay/generate-url', undefined, requestConfig?.config);
