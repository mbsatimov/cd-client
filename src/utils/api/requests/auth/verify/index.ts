import { api } from '@/utils/api/instance.ts';

export const putVerify = ({ otpKey, config }: RequestConfig & { otpKey: number | string }) =>
  api.put<VerifyResponse>(`auth/verify/${otpKey}`, undefined, config);
