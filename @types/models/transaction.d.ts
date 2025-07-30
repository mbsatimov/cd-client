type TransactionFor = 'CD_OFFLINE' | 'CD_ONLINE' | 'COIN_EXCHANGE' | 'COIN_SHARE';
type TransactionSource = 'CLICK' | 'PAYME' | 'UZUM';
interface Transaction {
  amount: number;
  createdAt: string;
  fundingSource?: TransactionSource;
  isCanceled: boolean;
  isExpense: boolean;
  numberOfPurchasedCoins: number;
  paidFor?: TransactionFor;
}

type TransactionsResponse = Transaction[];
