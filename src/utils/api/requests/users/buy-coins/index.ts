import { api } from '@/utils/api/instance.ts';

export const postBuyCoins = ({ config }: RequestConfig) =>
  api.post('users/buy-coins', undefined, config);
