type TransactionFor = 'CD_OFFLINE' | 'CD_ONLINE' | 'PAPER';
type TransactionSource = 'CLICK' | 'PAYME' | 'UZUM';
interface Transaction {
  amount: number;
  createdAt: string;
  fundingSource?: TransactionSource;
  isCanceled: boolean;
  isExpense: boolean;
  paidFor?: TransactionFor;
}

type TransactionsResponse = Transaction[];
