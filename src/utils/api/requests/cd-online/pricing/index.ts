import { api } from '@/utils/api/instance.ts';

export const getCDOnlinePricing = (requestConfig?: RequestConfig) =>
  api.get<CDOnlinePricingResponse>('cd-online-pricing', requestConfig?.config);
