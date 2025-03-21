import { api } from '@/utils/api/instance';

export const getRegistrations = (requestConfig?: RequestConfig) =>
  api.get<RegistrationsResponse>('exam-registrations', requestConfig?.config);

export const postRegistration = ({ data, config }: RequestConfig<RegistrationRequest>) =>
  api.post<RegistrationsResponse>('exam-registrations', data, config);
