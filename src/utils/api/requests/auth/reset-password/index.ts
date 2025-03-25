import { api } from '@/utils/api/instance.ts';

export const putResetPassword = ({ otpKey, config }: RequestConfig & { otpKey: number | string }) =>
  api.put<VerifyResponse>(`auth/reset-password/${otpKey}`, undefined, config);
