import { api } from '@/utils/api/instance.ts';

export const getCDOnlineParticipation = (requestConfig?: RequestConfig) =>
  api.get<CDOnlineParticipationListResponse>('cd-online-participation', requestConfig?.config);

export const postCDOnlineParticipation = ({
  data,
  config
}: RequestConfig<CDOnlineParticipationRequest>) =>
  api.post<CDOnlineParticipationResponse>('cd-online-participation', data, config);
