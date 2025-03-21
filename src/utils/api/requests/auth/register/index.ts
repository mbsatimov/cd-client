import { api } from '@/utils/api/instance.ts';

export const postRegister = ({ config, data }: RequestConfig<RegisterRequestData>) =>
  api.post<RegisterResponse>('auth/register', data, config);
