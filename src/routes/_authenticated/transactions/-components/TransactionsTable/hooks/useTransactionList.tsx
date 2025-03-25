import { useQuery } from '@tanstack/react-query';

import { getTransactions } from '@/utils/api/requests';

export const useTransactionList = () => {
  const getTransactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions()
  });

  const data: TransactionsResponse = [
    {
      amount: 20000,
      createdAt: '2025-03-21T19:16:24.459357',
      fundingSource: 'UZUM',
      isCanceled: false,
      isIncome: true
    },
    {
      amount: 10000,
      createdAt: '2025-03-18T12:18:41.556764',
      isCanceled: false,
      paidFor: 'PAPER',
      isIncome: false
    }
  ];

  return {
    state: {
      transactions: data || getTransactionsQuery.data?.data,
      isLoading: getTransactionsQuery.isLoading
    }
  };
};
