import { api } from '@/utils/api/instance.ts';

export const getCDOnlineAll = (requestConfig?: RequestConfig) =>
  api.get<CDOnlineListResponse>('cd-online/all', requestConfig?.config);

export const getCDOnlineSolveParticipantId = ({
  participantId,
  config
}: RequestConfig & { participantId: string }) =>
  api.get<CDOnlineSolveResponse>(`cd-online/solve/${participantId}`, config);
