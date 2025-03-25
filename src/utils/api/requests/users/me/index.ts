import { api } from '@/utils/api/instance.ts';

export const getMe = (requestConfig?: RequestConfig) =>
  api.get<UserResponse>('users/me', requestConfig?.config);

export const patchMe = ({ data, config }: RequestConfig<ProfileRequestData>) =>
  api.patch('users/me', data, config);
