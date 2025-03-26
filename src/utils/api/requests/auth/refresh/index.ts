import { api } from '@/utils/api/instance.ts';

export const postRefresh = (requestConfig?: RequestConfig) =>
  api.post<RefreshResponse>('auth/resend-code', undefined, requestConfig?.config);
