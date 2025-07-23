import { api } from '@/utils/api/instance.ts';

export const getCDOnlineResult = ({
  participantId,
  config
}: RequestConfig & { participantId: string }) =>
  api.get<CDOnlineResultResponse>(`cd-online/result/${participantId}`, config);

export const postCDOnlineResult = ({
  participantId,
  data,
  config
}: RequestConfig<CDOnlineResultRequest> & { participantId: string }) =>
  api.post(`cd-online/result/${participantId}`, data, config);
