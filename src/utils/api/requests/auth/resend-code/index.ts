import { api } from '@/utils/api/instance.ts';

export const postResendCode = ({ otpKey, config }: RequestConfig & { otpKey: number | string }) =>
  api.post<VerifyResponse>(`auth/resend-code/${otpKey}`, undefined, config);
