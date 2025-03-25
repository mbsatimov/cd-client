import { format } from 'date-fns';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

import {
  Badge,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui';
import { cn, formatPrice } from '@/lib/utils.ts';
import { transactionForMap, transactionSourceMap } from '@/utils/constants/transaction.ts';

import { useTransactionList } from './hooks';

export const TransactionsTable = () => {
  const { state } = useTransactionList();

  if (state.isLoading) {
    return (
      <div className='mt-10 grid place-items-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <Table>
        <TableHeader>
          <TableRow className='font-medium'>
            <TableHead>#</TableHead>
            <TableHead>DATE INITIATED</TableHead>
            <TableHead>SOURCE</TableHead>
            <TableHead>PAID FOR</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>AMOUNT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='font-medium text-muted-foreground'>
          {state.transactions?.length ? (
            state.transactions?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{format(row.createdAt, 'dd MMM, yyyy HH:mm')}</TableCell>
                <TableCell>
                  {row.fundingSource ? (
                    <Badge variant='outline'>{transactionSourceMap[row.fundingSource]}</Badge>
                  ) : (
                    <span className='ml-2'>-</span>
                  )}
                </TableCell>
                <TableCell>{row.paidFor ? transactionForMap[row.paidFor] : '-'}</TableCell>
                <TableCell>
                  {row.isIncome ? (
                    <div className='flex items-center gap-1'>
                      <ArrowUpIcon className='size-4' />
                      Deposit
                    </div>
                  ) : (
                    <div className='flex items-center gap-1'>
                      <ArrowDownIcon className='size-4' />
                      Exam Fee
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      'shadow-none',
                      row.isIncome
                        ? 'bg-emerald-500/10 text-emerald-700'
                        : 'bg-red-500/10 text-red-700'
                    )}
                  >
                    {row.isIncome ? '+' : '-'}
                    {formatPrice(row.amount)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className='h-24 text-center' colSpan={6}>
                No transactions.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
