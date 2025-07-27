import { api } from '@/utils/api/instance.ts';

export const getCDOnlinePricing = (requestConfig?: RequestConfig) =>
  api.get<CDOnlinePricingResponse>('dashboard/cd-online-pricing', requestConfig?.config);
