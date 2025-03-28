import { api } from '@/utils/api/instance.ts';

export const postRefresh = (requestConfig?: RequestConfig) =>
  api.post<RefreshResponse>('auth/refresh', undefined, requestConfig?.config);
