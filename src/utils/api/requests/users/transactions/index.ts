import { api } from '@/utils/api/instance.ts';

export const getTransactions = () => api.get<TransactionsResponse>('users/transactions/me');
