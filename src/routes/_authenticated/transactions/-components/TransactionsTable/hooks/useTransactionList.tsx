import { useQuery } from '@tanstack/react-query';

import { getTransactions } from '@/utils/api/requests';

export const useTransactionList = () => {
  const getTransactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions()
  });

  return {
    state: {
      transactions: getTransactionsQuery.data?.data,
      isLoading: getTransactionsQuery.isLoading
    }
  };
};
