import { api } from '@/utils/api/instance.ts';

export const postForgotPassword = ({ config, data }: RequestConfig<ForgotPasswordRequestData>) =>
  api.post<ForgotPasswordResponse>('auth/forget-password', data, config);
